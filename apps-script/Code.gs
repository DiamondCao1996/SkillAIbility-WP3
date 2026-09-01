/**
 * SkillAIbility WP3 – workshop data collector
 * ------------------------------------------------
 * Receives submissions from the GitHub Pages tools and appends them to
 * this Google Sheet:
 *   - Solution canvas   → sheet "Canvas"           (one row per submission)
 *   - Inclusion matrix  → sheet "Inclusion"        (one row per submission, one column per cell)
 *                       → sheet "Inclusion_cells"  (long format: one row per cell entry, for analysis)
 *                       → sheet "Inclusion_codes"  (code definitions per submission)
 *
 * Setup: see README.md in the repository (≈3 minutes).
 */

var META = ["received_at", "submission_id", "workshop", "group", "use_case", "participants", "date", "submitted_at", "user_agent"];

var CANVAS_FIELDS = [
  "challenge", "persona", "pain_points", "goals",
  "solution", "uvp",
  "risks", "kpi_social", "kpi_technical", "kpi_operational", "kpi_economic", "skills",
  "action_plan"
];

var DIMS = ["TA", "TE", "OR"];
var GROUPS = ["novice", "deaf", "aging", "physical", "cognitive"];
var OUTCOMES = ["augmentation", "inclusion", "symbiosis", "empowerment"];

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0b1b3f").setFontColor("#ffffff");
    sh.setFrozenRows(1);
  }
  return sh;
}
function metaRow_(d) {
  return META.map(function (c) { return c === "received_at" ? new Date() : (d[c] === undefined ? "" : String(d[c])); });
}

/* ---------- Canvas ---------- */
function canvasHeaders_() { return META.concat(CANVAS_FIELDS); }
function saveCanvas_(d) {
  var row = metaRow_(d).concat(CANVAS_FIELDS.map(function (c) { return d[c] === undefined ? "" : String(d[c]); }));
  sheet_("Canvas", canvasHeaders_()).appendRow(row);
}

/* ---------- Inclusion matrix ---------- */
function inclusionHeaders_() {
  var h = META.slice();
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) { h.push(dim + ":" + g + ":" + o); }); }); });
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) { h.push("note:" + dim + ":" + g + ":" + o); }); }); });
  h.push("codes_json");
  return h;
}
function saveInclusion_(d) {
  var dims = d.dims || {};
  var meta = metaRow_(d);

  // wide row
  var row = meta.slice();
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) {
    var cells = (dims[dim] && dims[dim].cells) || {};
    row.push((cells[g + ":" + o] || []).join(", "));
  }); }); });
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) {
    var notes = (dims[dim] && dims[dim].notes) || {};
    row.push(notes[g + ":" + o] || "");
  }); }); });
  var codesJson = {};
  DIMS.forEach(function (dim) { codesJson[dim] = (dims[dim] && dims[dim].codes) || []; });
  row.push(JSON.stringify(codesJson));
  sheet_("Inclusion", inclusionHeaders_()).appendRow(row);

  // long format: one row per (dimension, group, outcome, code)
  var longSh = sheet_("Inclusion_cells", ["received_at", "submission_id", "group", "use_case", "dimension", "worker_group", "outcome", "code", "code_label", "frequent", "note"]);
  var longRows = [];
  DIMS.forEach(function (dim) {
    var st = dims[dim] || {}; var cells = st.cells || {}; var notes = st.notes || {};
    var codeMap = {}; (st.codes || []).forEach(function (c) { codeMap[c.id] = c; });
    GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) {
      var key = g + ":" + o;
      (cells[key] || []).forEach(function (code) {
        var c = codeMap[code] || {};
        longRows.push([new Date(), d.submission_id || "", d.group || "", d.use_case || "", dim, g, o, code, c.label || "", c.freq ? "yes" : "no", notes[key] || ""]);
      });
    }); });
  });
  if (longRows.length) longSh.getRange(longSh.getLastRow() + 1, 1, longRows.length, longRows[0].length).setValues(longRows);

  // code definitions
  var codeSh = sheet_("Inclusion_codes", ["received_at", "submission_id", "group", "use_case", "dimension", "code", "label", "frequent"]);
  var codeRows = [];
  DIMS.forEach(function (dim) {
    ((dims[dim] && dims[dim].codes) || []).forEach(function (c) {
      codeRows.push([new Date(), d.submission_id || "", d.group || "", d.use_case || "", dim, c.id, c.label || "", c.freq ? "yes" : "no"]);
    });
  });
  if (codeRows.length) codeSh.getRange(codeSh.getLastRow() + 1, 1, codeRows.length, codeRows[0].length).setValues(codeRows);
}

/* ---------- entry points ---------- */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    if (data.form === "inclusion") saveInclusion_(data); else saveCanvas_(data);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, id: data.submission_id, form: data.form || "canvas" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Health check: open the web-app URL in a browser. */
function doGet() {
  var c = sheet_("Canvas", canvasHeaders_()).getLastRow() - 1;
  var i = sheet_("Inclusion", inclusionHeaders_()).getLastRow() - 1;
  return ContentService.createTextOutput("SkillAIbility WP3 collector is running. Canvas rows: " + c + " · Inclusion rows: " + i)
    .setMimeType(ContentService.MimeType.TEXT);
}

/** Run once from the editor to create the sheets/headers and grant permissions. */
function setup() {
  sheet_("Canvas", canvasHeaders_());
  sheet_("Inclusion", inclusionHeaders_());
  sheet_("Inclusion_cells", ["received_at", "submission_id", "group", "use_case", "dimension", "worker_group", "outcome", "code", "code_label", "frequent", "note"]);
  sheet_("Inclusion_codes", ["received_at", "submission_id", "group", "use_case", "dimension", "code", "label", "frequent"]);
  var s0 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  if (s0 && s0.getLastRow() === 0) SpreadsheetApp.getActiveSpreadsheet().deleteSheet(s0);
  Logger.log("Ready: " + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}
