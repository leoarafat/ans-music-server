import { Request } from 'express';
import exceljs from 'exceljs';
import fs from 'fs';
const insertIntoDB = async (req: Request) => {
  try {
    if (!req.files.statics || Object.keys(req.files.statics).length === 0) {
      throw new Error('No files were uploaded.');
    }

    const excelFile = req.files.statics[0];
    const filePath = excelFile.path;

    // Read the file from disk
    const bufferData = fs.readFileSync(filePath);

    const workbook = new exceljs.Workbook();
    const worksheet = await workbook.xlsx.load(bufferData);
    console.log(worksheet, 'worksheet');
    const data = [];

    worksheet.Row({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) {
        const headers = row.values;
        const upcIndex = headers.indexOf('UPC');
        const isrcIndex = headers.indexOf('ISRC');
        const monthIndex = headers.indexOf('Month');
        const storeIndex = headers.indexOf('store');
        const labelIndex = headers.indexOf('label');
        const artistIndex = headers.indexOf('artist');
        const countryIndex = headers.indexOf('COUNTRY');
        const revenueShareIndex = headers.indexOf('clients revenue share');

        worksheet.eachRow({ startingRow: 2 }, (rowData, rowIndex) => {
          const rowDataValues = rowData.values;

          const extractedData = {
            UPC: rowDataValues[upcIndex],
            ISRC: rowDataValues[isrcIndex],
            Month: rowDataValues[monthIndex],
            Store: rowDataValues[storeIndex],
            Label: rowDataValues[labelIndex],
            Artist: rowDataValues[artistIndex],
            Country: rowDataValues[countryIndex],
            RevenueShare: rowDataValues[revenueShareIndex],
          };

          data.push(extractedData);
        });
      }
    });

    console.log(data, 'Extracted Data');
    fs.unlinkSync(filePath);

    // Now you can perform database insertion or any other processing with the extracted data.
  } catch (error) {
    console.error(error.message);
    // Handle the error as needed
  }
};

export const StaticsService = {
  insertIntoDB,
};
