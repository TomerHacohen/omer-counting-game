/**
 * Google Apps Script for Omer Counting Game
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1f-aW_52X--eDXuFxfmDQn3-ve95t2lHhgNTMzPj9ZhQ/edit
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Save (💾)
 * 5. Click Deploy → New deployment
 * 6. Select type: Web app
 * 7. Description: "Omer Game API"
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Click Deploy
 * 11. Copy the Web app URL
 * 12. Paste the URL in the game's settings (⚙️ button)
 *
 * SHEET STRUCTURE:
 * Column A: Name
 * Column B: Gender
 * Column C: Emoji
 * Columns D-AW: Day 1 - Day 49 (✓ for checked in)
 */

// Your Google Sheet ID (replace with actual ID or use active sheet)
const SHEET_ID = '1f-aW_52X--eDXuFxfmDQn3-ve95t2lHhgNTMzPj9ZhQ';

/**
 * Handle GET requests - Retrieve all player data
 */
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');
    const data = sheet.getDataRange().getValues();

    // First row is headers
    const headers = data[0];
    const players = [];

    // Parse each player row
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Skip empty rows
      if (!row[0]) continue;

      const player = {
        name: row[0],
        gender: row[1],
        emoji: row[2],
        checkins: []
      };

      // Check days 1-49 (columns D-AW = indices 3-51)
      for (let day = 1; day <= 49; day++) {
        const colIndex = day + 2; // Column D = index 3
        if (row[colIndex] === '✓' || row[colIndex] === 'TRUE' || row[colIndex] === true) {
          player.checkins.push(day);
        }
      }

      players.push(player);
    }

    const response = {
      success: true,
      players: players,
      timestamp: new Date().toISOString()
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests - Update player data
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'updatePlayer') {
      updatePlayerData(data.player);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Player updated successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Unknown action'
    }))
    .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Update or insert player data in the sheet
 */
function updatePlayerData(player) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');
  const data = sheet.getDataRange().getValues();

  // Find existing player row
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === player.name) {
      rowIndex = i + 1; // Sheet rows are 1-indexed
      break;
    }
  }

  // If player doesn't exist, add new row
  if (rowIndex === -1) {
    rowIndex = sheet.getLastRow() + 1;
  }

  // Update player data
  sheet.getRange(rowIndex, 1).setValue(player.name);
  sheet.getRange(rowIndex, 2).setValue(player.gender);
  sheet.getRange(rowIndex, 3).setValue(player.emoji);

  // Clear all day columns first
  for (let day = 1; day <= 49; day++) {
    const colIndex = day + 3; // Column D = 4
    sheet.getRange(rowIndex, colIndex).setValue('');
  }

  // Mark checked-in days
  if (player.checkins && player.checkins.length > 0) {
    player.checkins.forEach(day => {
      const colIndex = day + 3; // Column D = 4
      sheet.getRange(rowIndex, colIndex).setValue('✓');
    });
  }
}

/**
 * Initialize sheet with headers (run this once manually if needed)
 */
function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');

  // Create headers
  const headers = ['Name', 'Gender', 'Emoji'];
  for (let day = 1; day <= 49; day++) {
    headers.push(`Day ${day}`);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#667eea')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Freeze header row
  sheet.setFrozenRows(1);

  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);

  Logger.log('Sheet initialized successfully!');
}

/**
 * Test function to verify setup
 */
function testSetup() {
  // Test adding a player
  const testPlayer = {
    name: 'Test Player',
    gender: 'male',
    emoji: '🧪',
    checkins: [1, 2, 3]
  };

  updatePlayerData(testPlayer);
  Logger.log('Test player added!');

  // Test reading data
  const result = doGet();
  Logger.log('Retrieved data:', result.getContent());
}
