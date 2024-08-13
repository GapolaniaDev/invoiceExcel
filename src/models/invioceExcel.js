import ExcelJS from "exceljs";
// excelConfig.js
export const EXCEL_CONFIG = {
  INFO_COMPANY_START : 9,
  TITTLE_START : 7,
  TABLE_HEADER_START_NUMBER: 14,
  TABLE_HEADER_COLUMNS_START_NUMBER: 15,
  TABLE_BODY_START_NUMBER: 16,
  columns: [
    { width: 20 },
    { autoWidth: true },
    { width: 20 },
    { autoWidth: true },
    { autoWidth: true },
    { autoWidth: true },
    { autoWidth: true },
    { width: 20 },
    { autoWidth: true },
    { autoWidth: true },
    { autoWidth: true },
    { width: 5 },
    { width: 15 },
  ],
  tableHeaderStyle: {
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "000000" } },
    font: { name: "Arial", color: { argb: "FFFFFF" }, bold: true },
    alignment: { vertical: "middle", horizontal: "center" },
  },
  dateCellStyle: {
    alignment: { vertical: "middle", horizontal: "center" },
    dataType: ExcelJS.ValueType.Date,
    numFmt: "dd/mm/yyyy",
  },
  centerAlignStyle: {
    alignment: { vertical: "middle", horizontal: "center" },
  },
  amountCellStyle: {
    alignment: { vertical: "middle", horizontal: "center" },
    numFmt: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
  },
  boldStyle: {
    font: { bold: true },
  },
  mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const BORDER_STYLES = {
  thin: {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  },
  thick: {
    top: { style: "thick" },
    left: { style: "thick" },
    bottom: { style: "thick" },
    right: { style: "thick" },
  },
};
