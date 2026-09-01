/**
 * SkillAIbility WP3 – Solution Canvas collector
 * ------------------------------------------------
 * Receives canvas submissions from the GitHub Pages canvas and appends
 * them as rows to the Google Sheet this script is bound to.
 *
 * Setup: see README.md in the repository (≈3 minutes).
 */

const SHEET_NAME = "Submissions";

const COLUMNS = [
  "received_at", "submission_id", "workshop", "group", "use_case", "participants", "date",
  "challenge", "persona", "pain_points", "goals",
  "solution", "uvp",
  "risks", "kpi_social", "kpi_technical", "kpi_operational", "kpi_economic", "skills",
  "action_plan",
  "submitted_at", "user_agent"
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLUMNS);
    sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold").setBackground("#0b1b3f").setFontColor("#ffffff");
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const row = COLUMNS.map(function (c) {
      if (c === "received_at") return new Date();
      return data[c] === undefined ? "" : String(data[c]);
    });
    getSheet_().appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, id: data.submission_id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Simple health check: open the web-app URL in a browser. */
function doGet() {
  return ContentService.createTextOutput("SkillAIbility WP3 canvas collector is running. Rows: " + (getSheet_().getLastRow() - 1))
    .setMimeType(ContentService.MimeType.TEXT);
}

/** Run once from the editor to create the header row and check permissions. */
function setup() {
  getSheet_();
  Logger.log("Sheet ready: " + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}
