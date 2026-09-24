/**
 * SAI INTERIOR DESIGN — GOOGLE SHEETS ENQUIRY BACKEND
 *
 * 1. Create/open a Google Sheet.
 * 2. Extensions → Apps Script.
 * 3. Replace the editor contents with this file.
 * 4. Run setup() once and approve permissions.
 * 5. Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 6. Copy the /exec URL into index.html as SCRIPT_URL.
 */

const SHEET_NAME = 'Enquiries';
const SPREADSHEET_TITLE = 'Sai Interior Design — Website Enquiries';

function setup() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SPREADSHEET_ID');

  if (!id) {
    const ss = SpreadsheetApp.create(SPREADSHEET_TITLE);
    id = ss.getId();
    props.setProperty('SPREADSHEET_ID', id);
  }

  const ss = SpreadsheetApp.openById(id);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Phone / WhatsApp',
      'Email',
      'Project Type',
      'Requirement',
      'Source'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.autoResizeColumns(1, 7);
  }

  Logger.log('Google Sheet URL: ' + ss.getUrl());
  return ss.getUrl();
}

function doGet(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    let id = props.getProperty('SPREADSHEET_ID');

    if (!id) {
      setup();
      id = props.getProperty('SPREADSHEET_ID');
    }

    const ss = SpreadsheetApp.openById(id);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone / WhatsApp',
        'Email',
        'Project Type',
        'Requirement',
        'Source'
      ]);
      sheet.setFrozenRows(1);
    }

    const p = e && e.parameter ? e.parameter : {};

    // Ignore empty test requests.
    if (!p.name && !p.phone && !p.message) {
      return json_({ok: true, message: 'Sai Interior Design enquiry endpoint is active.'});
    }

    sheet.appendRow([
      new Date(),
      clean_(p.name),
      clean_(p.phone),
      clean_(p.email),
      clean_(p.projectType),
      clean_(p.message),
      clean_(p.source || 'Website')
    ]);

    return json_({ok: true, message: 'Enquiry saved'});
  } catch (err) {
    console.error(err);
    return json_({ok: false, error: String(err)});
  }
}

function clean_(value) {
  return String(value || '').trim().substring(0, 5000);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
