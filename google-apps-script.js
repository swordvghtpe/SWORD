
/**
 * =================================================================================
 * Google Apps Script for SWORD-2026 Registration Form
 *
 * INSTRUCTIONS:
 * 1. Open your Google Sheet for registrations.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete ALL existing code in the script editor.
 * 4. Paste THIS ENTIRE SCRIPT into the editor.
 * 5. Configure the ADMIN_EMAIL and FOLDER_ID variables below.
 * 6. Click "Deploy" > "New deployment".
 * 7. Set "Execute as": "Me".
 * 8. Set "Who has access": "Anyone".
 * 9. Click "Deploy", authorize the script's permissions.
 * 10. Copy the NEW "Web app URL" and paste it into `components/Registration.tsx`.
 * =================================================================================
 */

// --- CONFIGURATION (CHECK THESE VALUES CAREFULLY) ---
var ADMIN_EMAIL = "sword.vghtpe@gmail.com"; 
var FOLDER_ID = "1cuItxBzp0SUIPFzoK-6uQI2gZvHWBHoJ"; // 已更新為使用者指定的資料夾 ID
var SHEET_NAME = "Sheet1"; // Make sure this matches your sheet tab name exactly.

// --- DO NOT EDIT BELOW THIS LINE ---

var EVENT_INFO = `
【SWORD-2026 研討會資訊】<br>
日期：2026 年 06 月 27 日 (週六)<br>
地點：臺北榮民總醫院 醫學科技大樓 大會議室<br>
地址：112臺北市北投區石牌路二段201號
`;

/**
 * Handles CORS preflight requests (OPTIONS method).
 */
function doOptions(e) {
  return ContentService.createTextOutput("");
}

/**
 * Handles the POST request from the registration form.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000); // Lock for 30 seconds

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error("Sheet named '" + SHEET_NAME + "' not found. Please check configuration.");
    }
    
    var data;
    try {
        data = JSON.parse(e.postData.contents);
    } catch (jsonErr) {
        throw new Error("Failed to parse JSON data. Ensure you are sending valid JSON.");
    }
    
    var fileUrl = "No Attachment";
    // Check if receiptFile exists and is a non-empty string before checking indexOf
    if (data.receiptFile && typeof data.receiptFile === 'string' && data.receiptFile.indexOf("base64,") !== -1) {
       if (!FOLDER_ID || FOLDER_ID === "YOUR_GOOGLE_DRIVE_FOLDER_ID") {
        throw new Error("Google Drive FOLDER_ID is not set in the script. File cannot be saved.");
      }
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var contentType = data.receiptFile.substring(5, data.receiptFile.indexOf(';'));
      var bytes = Utilities.base64Decode(data.receiptFile.substr(data.receiptFile.indexOf('base64,') + 7));
      var blob = Utilities.newBlob(bytes, contentType);
      
      // Generate Filename: YYYYMMDD_Name_Suffix.jpg
      var now = new Date();
      var yyyy = now.getFullYear();
      var mm = String(now.getMonth() + 1).padStart(2, '0');
      var dd = String(now.getDate()).padStart(2, '0');
      var dateStr = yyyy + mm + dd;
      
      var safeName = (data.name || "user").toString();
      var safeSuffix = (data.remittanceAccountSuffix || "00000").toString();
      
      var fileName = dateStr + "_" + safeName + "_" + safeSuffix + ".jpg";
      blob.setName(fileName);
      
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }
    
    var timestamp = new Date();
    sheet.appendRow([
      timestamp, data.name, data.email, data.phone, data.organization, data.category, 
      data.dietary, data.remittanceAccountSuffix, data.note, fileUrl, "待審核"
    ]);
    
    var lastRow = sheet.getLastRow();
    sendReviewEmail(lastRow, data, fileUrl);
    
    var successResponse = JSON.stringify({ "result": "success", "message": "Registration submitted successfully." });
    
    // Return as TEXT to avoid strict CORS/MIME checks on client side
    return ContentService.createTextOutput(successResponse)
      .setMimeType(ContentService.MimeType.TEXT);
    
  } catch (err) {
    Logger.log("doPost Error: " + err.toString());
    var errorResponse = JSON.stringify({ "result": "error", "error": err.toString() });
    return ContentService.createTextOutput(errorResponse)
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function sendReviewEmail(row, data, fileUrl) {
  try {
    var scriptUrl = ScriptApp.getService().getUrl();
    var approveLink = scriptUrl + "?action=approve&row=" + row + "&email=" + encodeURIComponent(data.email) + "&name=" + encodeURIComponent(data.name);
    var rejectLink = scriptUrl + "?action=reject_form&row=" + row + "&email=" + encodeURIComponent(data.email) + "&name=" + encodeURIComponent(data.name);
    
    // Inline CSS for buttons
    var btnStyle = "display: inline-block; padding: 12px 24px; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-family: sans-serif;";
    
    var htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #333;">SWORD-2026 新報名申請 (待審核)</h2>
        <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; border-color: #ddd;">
          <tr style="background-color: #f9f9f9;"><td><strong>姓名</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr style="background-color: #f9f9f9;"><td><strong>單位</strong></td><td>${data.organization}</td></tr>
          <tr><td><strong>類別</strong></td><td>${data.category}</td></tr>
          <tr style="background-color: #f9f9f9;"><td><strong>帳號末五碼</strong></td><td>${data.remittanceAccountSuffix}</td></tr>
          <tr><td><strong>匯款單據</strong></td><td><a href="${fileUrl}" target="_blank" style="color: #007bff;">查看圖片</a></td></tr>
        </table>
        <div style="margin-top: 25px; text-align: center;">
          <a href="${approveLink}" style="${btnStyle} background-color: #28a745; margin-right: 15px;">✅ 核准報名</a>
          <a href="${rejectLink}" style="${btnStyle} background-color: #dc3545;">❌ 拒絕報名</a>
        </div>
      </div>
    `;
    MailApp.sendEmail({ to: ADMIN_EMAIL, subject: "[待審核] SWORD-2026: " + data.name, htmlBody: htmlBody });
  } catch(err) {
      Logger.log("sendReviewEmail Error: " + err.toString());
  }
}

function doGet(e) {
  // Helper to create a nice styled HTML page
  var createPage = function(title, content) {
      var html = `
        <!DOCTYPE html>
        <html>
        <head>
          <base target="_top">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #f5f5f5; }
            .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px; width: 100%; text-align: center; }
            h1 { color: #333; margin-bottom: 20px; font-size: 24px; }
            p { color: #666; line-height: 1.5; margin-bottom: 20px; }
            .btn { display: inline-block; background: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; border: none; font-size: 16px; cursor: pointer; }
            .btn:hover { background: #0056b3; }
            textarea { width: 100%; height: 100px; padding: 10px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${title}</h1>
            ${content}
          </div>
        </body>
        </html>
      `;
      return HtmlService.createHtmlOutput(html)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  };

  if (!e || !e.parameter || !e.parameter.action) return createPage("Invalid Request", "<p>Missing parameters.</p>");

  var action = e.parameter.action;
  var row = e.parameter.row;
  var userEmail = e.parameter.email;
  var name = e.parameter.name;
  
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName(SHEET_NAME);

  if (action === "approve") {
    sheet.getRange(row, 11).setValue("報名成功");
    MailApp.sendEmail({ to: userEmail, subject: "【報名成功】SWORD-2026", htmlBody: `恭喜您報名成功！<br><br>${EVENT_INFO}` });
    return createPage("✅ 核准成功", `<p>已核准 <b>${name}</b> 的報名申請。<br>系統已自動發送通知信給申請人。</p>`);
  }

  if (action === "reject_form") {
     var scriptUrl = ScriptApp.getService().getUrl();
     var formHtml = `
        <p>請輸入拒絕 <b>${name}</b> 報名的原因：</p>
        <form action="${scriptUrl}" method="get">
            <input type="hidden" name="action" value="do_reject">
            <input type="hidden" name="row" value="${row}">
            <input type="hidden" name="email" value="${userEmail}">
            <input type="hidden" name="name" value="${name}">
            <textarea name="reason" placeholder="例如：匯款金額不符、圖片模糊..." required></textarea>
            <button type="submit" class="btn" style="background-color: #dc3545;">確認拒絕並發送通知</button>
        </form>
     `;
    return createPage("⛔ 拒絕報名", formHtml);
  }
  
  if (action === "do_reject") {
     var reason = e.parameter.reason;
     sheet.getRange(row, 11).setValue("報名失敗: " + reason);
     var emailBody = `親愛的 ${name} 您好：<br><br>很抱歉通知您，您的 SWORD-2026 報名審核未通過。<br><br><b>原因：${reason}</b><br><br>請修正後重新報名，或聯繫主辦單位，謝謝。<br><br>SWORD-2026 籌備委員會`;
     MailApp.sendEmail({ to: userEmail, subject: "【需重新報名】SWORD-2026 報名狀態通知", htmlBody: emailBody });
     return createPage("❌ 已拒絕", `<p>已拒絕 <b>${name}</b> 的報名。<br>拒絕原因：${reason}<br>系統已發送通知信。</p>`);
  }
  
  return createPage("Unknown Action", "<p>Action not recognized.</p>");
}
