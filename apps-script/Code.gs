/**
 * SkillAIbility WP3 – workshop data collector
 * ------------------------------------------------
 * Receives submissions from the GitHub Pages tools, appends them to this
 * Google Sheet, and emails the research team a summary + the full workbook
 * as an .xlsx attachment on every submission.
 *
 *   - Human-centric workforce canvas → sheet "Canvas"
 *   - Assessment (step 1 matrix + step 2 canvas)
 *       → "Assessment"        one row per submission (matrix cells + canvas fields)
 *       → "Assessment_cells"  long format: one row per cell entry (pivot-ready)
 *       → "Assessment_codes"  code definitions per submission
 *
 * Setup: see README.md in the repository (≈3 minutes).
 */

var EMAIL_TO = "huizhong@chalmers.se,sandra.jaksic@chalmers.se";
var SEND_EMAIL = true;   // set false to switch off the automatic emails

var META = ["received_at", "submission_id", "workshop", "company", "participants", "date", "submitted_at", "user_agent"];

var CANVAS_FIELDS = [
  "challenge", "persona", "pain_points", "goals",
  "solution", "uvp",
  "risks", "kpi_social", "kpi_technical", "kpi_operational", "kpi_economic", "skills",
  "action_plan"
];

// step-2 canvas of the assessment tool
var STEP2_FIELDS = [
  "challenge", "persona_notes", "pain_points", "goals",
  "uvp", "risks", "kpi_social", "kpi_technical", "kpi_operational", "kpi_economic", "skills", "action_plan"
];

var DIMS = ["TA", "TE", "OR"];
var GROUPS = ["novice", "deaf", "aging", "physical", "cognitive"];
var GROUP_NAMES = {
  novice: "Novice and learning-vulnerable workers",
  deaf: "Deaf and hard-of-hearing workers",
  aging: "Aging workers",
  physical: "Workers with physical support needs",
  cognitive: "Workers with cognitive support needs"
};
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
function str_(v) { return v === undefined || v === null ? "" : String(v); }

/* ---------- Workforce canvas ---------- */
function canvasHeaders_() { return META.concat(CANVAS_FIELDS); }
function saveCanvas_(d) {
  var row = metaRow_(d).concat(CANVAS_FIELDS.map(function (c) { return str_(d[c]); }));
  sheet_("Canvas", canvasHeaders_()).appendRow(row);
}

/* ---------- Assessment (matrix + linked canvas) ---------- */
function assessmentHeaders_() {
  var h = META.slice();
  h.push("personas");
  STEP2_FIELDS.forEach(function (f) { h.push("canvas:" + f); });
  DIMS.forEach(function (dim) { h.push("solution:" + dim + ":codes", "solution:" + dim + ":text"); });
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) { h.push(dim + ":" + g + ":" + o); }); }); });
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) { h.push("note:" + dim + ":" + g + ":" + o); }); }); });
  h.push("codes_json");
  return h;
}
function saveAssessment_(d) {
  var dims = d.dims || {};
  var canvas = d.canvas || {};
  var fields = canvas.fields || {};
  var sol = canvas.sol || {};
  var row = metaRow_(d);

  row.push((canvas.personas || []).map(function (p) { return GROUP_NAMES[p] || p; }).join("; "));
  STEP2_FIELDS.forEach(function (f) { row.push(str_(fields[f])); });
  DIMS.forEach(function (dim) {
    var s = sol[dim] || {};
    row.push((s.codes || []).join(", "), str_(s.text));
  });
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) {
    var cells = (dims[dim] && dims[dim].cells) || {};
    row.push((cells[g + ":" + o] || []).join(", "));
  }); }); });
  DIMS.forEach(function (dim) { GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) {
    var notes = (dims[dim] && dims[dim].notes) || {};
    row.push(str_(notes[g + ":" + o]));
  }); }); });
  var codesJson = {};
  DIMS.forEach(function (dim) { codesJson[dim] = (dims[dim] && dims[dim].codes) || []; });
  row.push(JSON.stringify(codesJson));
  sheet_("Assessment", assessmentHeaders_()).appendRow(row);

  // long format: one row per (dimension, worker group, outcome, code) + solution picks
  var longSh = sheet_("Assessment_cells", ["received_at", "submission_id", "company", "source", "dimension", "worker_group", "outcome", "code", "code_label", "frequent", "note"]);
  var longRows = [];
  DIMS.forEach(function (dim) {
    var st = dims[dim] || {}; var cells = st.cells || {}; var notes = st.notes || {};
    var codeMap = {}; (st.codes || []).forEach(function (c) { codeMap[c.id] = c; });
    GROUPS.forEach(function (g) { OUTCOMES.forEach(function (o) {
      var key = g + ":" + o;
      (cells[key] || []).forEach(function (code) {
        var c = codeMap[code] || {};
        longRows.push([new Date(), str_(d.submission_id), str_(d.company), "matrix", dim, g, o, code, str_(c.label), c.freq ? "yes" : "no", str_(notes[key])]);
      });
    }); });
    var s = sol[dim] || {};
    (s.codes || []).forEach(function (code) {
      var c = codeMap[code] || {};
      longRows.push([new Date(), str_(d.submission_id), str_(d.company), "solution", dim, "", "", code, str_(c.label), c.freq ? "yes" : "no", str_(s.text)]);
    });
  });
  if (longRows.length) longSh.getRange(longSh.getLastRow() + 1, 1, longRows.length, longRows[0].length).setValues(longRows);

  // code definitions
  var codeSh = sheet_("Assessment_codes", ["received_at", "submission_id", "company", "dimension", "code", "label", "frequent"]);
  var codeRows = [];
  DIMS.forEach(function (dim) {
    ((dims[dim] && dims[dim].codes) || []).forEach(function (c) {
      codeRows.push([new Date(), str_(d.submission_id), str_(d.company), dim, c.id, str_(c.label), c.freq ? "yes" : "no"]);
    });
  });
  if (codeRows.length) codeSh.getRange(codeSh.getLastRow() + 1, 1, codeRows.length, codeRows[0].length).setValues(codeRows);
}

/* ---------- email: summary + cumulative workbook as .xlsx ---------- */
function exportXlsx_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.flush();
  var url = "https://docs.google.com/spreadsheets/d/" + ss.getId() + "/export?format=xlsx";
  var resp = UrlFetchApp.fetch(url, { headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() } });
  var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd_HHmm");
  return resp.getBlob().setName("SkillAIbility_WP3_submissions_" + stamp + ".xlsx");
}
function summaryHtml_(d) {
  var h = "<h2 style='font-family:sans-serif'>SkillAIbility WP3 – new " + (d.form === "assessment" ? "assessment" : "canvas") + " submission</h2>";
  h += "<table style='font-family:sans-serif;font-size:13px;border-collapse:collapse'>";
  function tr(k, v) { if (v) h += "<tr><td style='padding:3px 10px 3px 0;font-weight:bold;vertical-align:top;white-space:nowrap'>" + k + "</td><td style='padding:3px 0'>" + String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>") + "</td></tr>"; }
  tr("Company", d.company); tr("Participants", d.participants); tr("Date", d.date); tr("Submission id", d.submission_id);
  if (d.form === "assessment") {
    var c = d.canvas || {}, f = c.fields || {}, sol = c.sol || {};
    tr("Personas", (c.personas || []).map(function (p) { return GROUP_NAMES[p] || p; }).join("; "));
    tr("Challenge", f.challenge); tr("Pain points", f.pain_points); tr("Goals", f.goals);
    DIMS.forEach(function (dim) {
      var s = sol[dim] || {};
      var label = dim === "TA" ? "Solution – task" : dim === "TE" ? "Solution – technology" : "Solution – organisation";
      tr(label, [(s.codes || []).join(", "), s.text].filter(Boolean).join(" | "));
    });
    tr("UVP", f.uvp); tr("Risks", f.risks); tr("Skills", f.skills); tr("Action plan", f.action_plan);
    var counts = DIMS.map(function (dim) {
      var cells = (d.dims && d.dims[dim] && d.dims[dim].cells) || {};
      var n = 0; Object.keys(cells).forEach(function (k) { n += cells[k].length; });
      return dim + ": " + n + " codes";
    }).join(" · ");
    tr("Matrix (step 1)", counts);
  } else {
    CANVAS_FIELDS.forEach(function (k) { tr(k.replace(/_/g, " "), d[k]); });
  }
  h += "</table><p style='font-family:sans-serif;font-size:12px;color:#666'>The attached Excel file contains all submissions so far (all tabs). Sent automatically by the WP3 collector.</p>";
  return h;
}
function notify_(d) {
  if (!SEND_EMAIL) return;
  try {
    var subject = "[SkillAIbility WP3] " + (d.form === "assessment" ? "Assessment" : "Canvas") + " submission – " + (d.company || "unknown company");
    MailApp.sendEmail({ to: EMAIL_TO, subject: subject, htmlBody: summaryHtml_(d), attachments: [exportXlsx_()] });
  } catch (err) {
    // Never fail the submission because of email problems; log instead.
    console.error("Email failed: " + err);
  }
}

/* ---------- entry points ---------- */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents || "{}");
    if (data.form === "assessment" || data.form === "inclusion") saveAssessment_(data); else saveCanvas_(data);
    notify_(data);
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
  var a = sheet_("Assessment", assessmentHeaders_()).getLastRow() - 1;
  return ContentService.createTextOutput("SkillAIbility WP3 collector is running. Canvas rows: " + c + " · Assessment rows: " + a)
    .setMimeType(ContentService.MimeType.TEXT);
}

/** Run once from the editor: creates the tabs and triggers the permission prompts
 *  (Sheets + send email + fetch for the xlsx export). Also sends a test email. */
function setup() {
  sheet_("Canvas", canvasHeaders_());
  sheet_("Assessment", assessmentHeaders_());
  sheet_("Assessment_cells", ["received_at", "submission_id", "company", "source", "dimension", "worker_group", "outcome", "code", "code_label", "frequent", "note"]);
  sheet_("Assessment_codes", ["received_at", "submission_id", "company", "dimension", "code", "label", "frequent"]);
  var s0 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  if (s0 && s0.getLastRow() === 0) SpreadsheetApp.getActiveSpreadsheet().deleteSheet(s0);
  if (SEND_EMAIL) {
    MailApp.sendEmail({ to: EMAIL_TO, subject: "[SkillAIbility WP3] Collector test", htmlBody: "<p>The WP3 workshop collector is set up correctly. Future submissions will arrive like this, with the full workbook attached.</p>", attachments: [exportXlsx_()] });
  }
  Logger.log("Ready: " + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}
