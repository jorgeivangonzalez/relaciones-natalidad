// ════════════════════════════════════════════════════════
//  GOOGLE APPS SCRIPT — Receptor de encuesta
//  Instrucciones:
//  1. Abre Google Sheets → Extensiones → Apps Script
//  2. Pega este código completo
//  3. Guarda y despliega como Web App (cualquier usuario, acceso anónimo)
//  4. Copia la URL generada y pégala en index.html donde dice REEMPLAZA_CON_TU_URL
// ════════════════════════════════════════════════════════

const SHEET_NAME = "Respuestas"; // Cambia si quieres otro nombre de hoja

// Columnas en el orden que aparecerán en el Sheet
const COLUMNS = [
  "timestamp",
  "p1_edad",
  "p2_genero",
  "p2_bloque",
  "p3_residencia",
  "p3_detalle",
  "p4_situacion",
  "p5_medios",
  "p6_likert",
  "p7_estructura",
  "p8_genes",
  "p8_estatus",
  "p8_riqueza",
  "p9_dificultad",
  "p10_presion",
  "p11_actitud",
  "p12_barrera",
  // Bloque H
  "p13h_presion",
  "p14h_reciproc",
  "p15h_estanda",
  "p16h_comprom",
  "p17h_roles",
  // Bloque M
  "p13m_hiperg",
  "p14m_oferta",
  "p15m_ghost",
  "p16m_estand",
  "p17m_seguri",
  "p18m_priori",
  // Fase 5
  "p18_matrimon",
  "p19_hijos",
  "p20_desea",
  "p21_edad_ide",
  "p22_economi",
  "p23_cuidado",
  "p24_mascotas",
  "p25_redes",
  "p26_econom2",
  "p27_patron",
  "p28_descarte",
  "p29_sugar",
  "p30_intimidad"
];

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Crear hoja con encabezados si no existe
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(COLUMNS);
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0E0E12");
      headerRange.setFontColor("#C8F135");
      sheet.setFrozenRows(1);
    }

    // Parsear el JSON recibido
    const data = JSON.parse(e.postData.contents);

    // Construir fila en el orden de COLUMNS
    const row = COLUMNS.map(col => data[col] !== undefined ? data[col] : "");

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test manual desde el editor de Apps Script
function testSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
  }
  Logger.log("Hoja lista: " + sheet.getName());
}
