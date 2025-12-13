function doGet() {
  return ContentService
    .createTextOutput("🎙 Recorder API is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const FOLDER_ID = "FDID";

  const SECRET_MAP = {
    "aaa": "aaa",
  };

  if (!e || !e.parameter) {
    return ContentService.createTextOutput("NO_DATA");
  }

  const key = e.parameter.key;
  if (!SECRET_MAP[key]) {
    return ContentService.createTextOutput("INVALID_KEY");
  }

  if (!e.parameter.audio) {
    return ContentService.createTextOutput("NO_AUDIO");
  }

  const folder = DriveApp.getFolderById(FOLDER_ID);
  const bytes = Utilities.base64Decode(e.parameter.audio);

  const filename =
    SECRET_MAP[key] +
    "-" +
    Utilities.formatDate(
      new Date(),
      "Asia/Ho_Chi_Minh",
      "yyyyMMdd-HHmmss"
    ) +
    ".webm";

  const blob = Utilities.newBlob(bytes, "audio/webm", filename);
  folder.createFile(blob);

  return ContentService.createTextOutput("OK");
}
