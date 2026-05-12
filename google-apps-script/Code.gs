const SHEET_TABS = {
  contact: {
    name: 'Contact Us',
    headers: ['Timestamp', 'Language', 'Name', 'Mobile', 'Email', 'Message']
  },
  apply: {
    name: 'Apply Jobs',
    headers: ['Timestamp', 'Language', 'Full Name', 'Mobile', 'Location', 'Searched Role', 'Suggested Job', 'Description']
  },
  employees: {
    name: 'Request Employees',
    headers: ['Timestamp', 'Language', 'Full Name', 'Mobile', 'Job Type', 'Number of Employees']
  }
};

function doGet() {
  return jsonResponse({ ok: true, message: 'SN Infratech form endpoint is running.' });
}

function setupSheets() {
  Object.keys(SHEET_TABS).forEach(function (key) {
    const config = SHEET_TABS[key];
    const sheet = getOrCreateSheet_(config.name, config.headers);
    applySheetValidation_(sheet, key);
  });
}

function testContactSubmission() {
  const payload = {
    formType: 'contact',
    language: 'en',
    fields: {
      name: 'Test User',
      mobile: '9999999999',
      email: 'test@example.com',
      message: 'Manual test from Apps Script'
    }
  };

  const config = SHEET_TABS[payload.formType];
  validatePayload_(payload.formType, payload.fields);
  const sheet = getOrCreateSheet_(config.name, config.headers);
  sheet.appendRow(buildRow_(payload.formType, payload.language, payload.fields));
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const config = SHEET_TABS[payload.formType];

    if (!config) {
      throw new Error('Unknown formType: ' + payload.formType);
    }

    const sheet = getOrCreateSheet_(config.name, config.headers);
    const fields = payload.fields || {};
    validatePayload_(payload.formType, fields);
    const row = buildRow_(payload.formType, payload.language || 'en', fields);
    sheet.appendRow(row);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function getOrCreateSheet_(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function applySheetValidation_(sheet, formType) {
  const maxRows = Math.max(sheet.getMaxRows() - 1, 1);

  if (formType === 'contact') {
    setTextValidation_(sheet, 3, maxRows);
    setPhoneValidation_(sheet, 4, maxRows);
    setEmailValidation_(sheet, 5, maxRows);
    return;
  }

  if (formType === 'apply') {
    setTextValidation_(sheet, 3, maxRows);
    setPhoneValidation_(sheet, 4, maxRows);
    setTextValidation_(sheet, 5, maxRows);
    setTextValidation_(sheet, 6, maxRows);
    return;
  }

  setTextValidation_(sheet, 3, maxRows);
  setPhoneValidation_(sheet, 4, maxRows);
  setTextValidation_(sheet, 5, maxRows);
  setEmployeeCountValidation_(sheet, 6, maxRows);
}

function setTextValidation_(sheet, column, maxRows) {
  const letter = columnToLetter_(column);
  const rule = SpreadsheetApp.newDataValidation()
    .requireFormulaSatisfied('=REGEXMATCH(' + letter + '2,"^[A-Za-z .\'-]+$")')
    .setAllowInvalid(false)
    .setHelpText('Letters, spaces, dots, apostrophes, and hyphens only.')
    .build();

  sheet.getRange(2, column, maxRows, 1).setDataValidation(rule);
}

function setPhoneValidation_(sheet, column, maxRows) {
  const letter = columnToLetter_(column);
  const rule = SpreadsheetApp.newDataValidation()
    .requireFormulaSatisfied('=REGEXMATCH(TO_TEXT(' + letter + '2),"^[0-9]{10}$")')
    .setAllowInvalid(false)
    .setHelpText('Enter exactly 10 digits.')
    .build();

  sheet.getRange(2, column, maxRows, 1).setDataValidation(rule);
}

function setEmailValidation_(sheet, column, maxRows) {
  const letter = columnToLetter_(column);
  const rule = SpreadsheetApp.newDataValidation()
    .requireFormulaSatisfied('=REGEXMATCH(' + letter + '2,"^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")')
    .setAllowInvalid(false)
    .setHelpText('Enter a valid email address.')
    .build();

  sheet.getRange(2, column, maxRows, 1).setDataValidation(rule);
}

function setEmployeeCountValidation_(sheet, column, maxRows) {
  const letter = columnToLetter_(column);
  const rule = SpreadsheetApp.newDataValidation()
    .requireFormulaSatisfied('=AND(ISNUMBER(' + letter + '2),' + letter + '2>=1,' + letter + '2<=100)')
    .setAllowInvalid(false)
    .setHelpText('Enter a number from 1 to 100.')
    .build();

  sheet.getRange(2, column, maxRows, 1).setDataValidation(rule);
}

function columnToLetter_(column) {
  let letter = '';

  while (column > 0) {
    const remainder = (column - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    column = Math.floor((column - remainder) / 26);
  }

  return letter;
}

function validatePayload_(formType, fields) {
  if (formType === 'contact') {
    requireFields_(fields, ['name', 'mobile', 'email', 'message']);
    requireText_(fields.name, 'Name');
    requirePhone_(fields.mobile);
    requireEmail_(fields.email);
    return;
  }

  if (formType === 'apply') {
    requireFields_(fields, ['fullName', 'mobile', 'location', 'description']);
    requireText_(fields.fullName, 'Full name');
    requirePhone_(fields.mobile);
    requireText_(fields.location, 'Location');

    if (fields.roleSearch) {
      requireText_(fields.roleSearch, 'Searched role');
    }
    return;
  }

  requireFields_(fields, ['fullName', 'mobile', 'jobType', 'employeeCount']);
  requireText_(fields.fullName, 'Full name');
  requirePhone_(fields.mobile);
  requireText_(fields.jobType, 'Job type');
  requireEmployeeCount_(fields.employeeCount);
}

function requireFields_(fields, keys) {
  keys.forEach(function (key) {
    if (!String(fields[key] || '').trim()) {
      throw new Error(key + ' is required.');
    }
  });
}

function requireText_(value, label) {
  if (!/^[\p{L}\s.'-]+$/u.test(String(value || '').trim())) {
    throw new Error(label + ' must contain letters only.');
  }
}

function requirePhone_(value) {
  if (!/^[0-9]{10}$/.test(String(value || '').trim())) {
    throw new Error('Mobile number must contain exactly 10 digits.');
  }
}

function requireEmail_(value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())) {
    throw new Error('Email address is invalid.');
  }
}

function requireEmployeeCount_(value) {
  const normalized = String(value || '').trim();
  const count = Number(normalized);

  if (!/^[0-9]+$/.test(normalized) || count < 1 || count > 100) {
    throw new Error('Number of employees must be between 1 and 100.');
  }
}

function buildRow_(formType, language, fields) {
  const timestamp = new Date();

  if (formType === 'contact') {
    return [timestamp, language, fields.name || '', fields.mobile || '', fields.email || '', fields.message || ''];
  }

  if (formType === 'apply') {
    return [
      timestamp,
      language,
      fields.fullName || '',
      fields.mobile || '',
      fields.location || '',
      fields.roleSearch || '',
      fields.suggestedJob || '',
      fields.description || ''
    ];
  }

  return [
    timestamp,
    language,
    fields.fullName || '',
    fields.mobile || '',
    fields.jobType || '',
    Number(fields.employeeCount || 0)
  ];
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
