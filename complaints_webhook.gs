/**
 * wer2 GO complaint log — Google Apps Script web app.
 *
 * Setup (one time, inside the "wer2GO Complaints" spreadsheet):
 *   1. Extensions → Apps Script, paste this file, save.
 *   2. Deploy → New deployment → type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   3. Copy the web app URL and set it as SHEET_WEBHOOK_URL on the Railway service.
 *
 * The bot POSTs JSON: {role, category, text, user, chat_id, source}
 * Rows are filed into a "Riders" or "Drivers" tab based on role.
 */

var HEADERS = ["Timestamp", "Role", "Category", "Complaint", "User", "Chat ID", "Source", "Status"];

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var role = String(data.role || "unknown").toLowerCase();
  var tabName = role === "driver" ? "Drivers" : role === "rider" ? "Riders" : "Other";

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    role,
    String(data.category || "other"),
    String(data.text || ""),
    String(data.user || ""),
    String(data.chat_id || ""),
    String(data.source || ""),
    "New",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
