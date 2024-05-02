/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import excelToJson from 'convert-excel-to-json';
import { Bulk } from './bulk.model';
import ApiError from '../../../errors/ApiError';

const createBulk = async (req: Request) => {
  //@ts-ignore
  // console.log(req.files['bulk']);
  const bulks = req.files['bulk'];

  if (!bulks[0].originalname.endsWith('.xlsx')) {
    throw new ApiError(
      400,
      'Invalid file format. Only .xlsx files are allowed.',
    );
  }
  const excelData = excelToJson({
    sourceFile: bulks[0].path,
  });

  // Extracting the sheet name dynamically
  const sheetName = Object.keys(excelData)[0];
  const sheet = excelData[sheetName];

  // Extracting the header row
  const headerRow = sheet[1];

  // Mapping each row to an object using the header row keys
  const jsonData = sheet.slice(1).map((row: any) => {
    const obj: any = {};
    Object.keys(headerRow).forEach(key => {
      obj[headerRow[key]] = row[key];
    });
    return obj;
  });

  try {
    const loopData: any[] = [];

    for (let i = 1; i < jsonData.length; i++) {
      const newData = {
        upc: String(jsonData[i].UPC),
        isrc: String(jsonData[i].ISRC),
        releaseTitle: String(jsonData[i]['Release title']),
        releaseSubtitle: String(jsonData[i]['Subtitle(version)']),
        trackTitle: String(jsonData[i]['Track Title']),
        trackSubtitle: String(jsonData[i]['Subtitle(version)']),
        cLine: String(jsonData[i]['C Line']),
        pLine: String(jsonData[i]['P line']),
        genre: String(jsonData[i].Genre),
        subGenre: String(jsonData[i]['Sub-Genre']),
        primaryArtist: String(jsonData[i]['Primary Artist']),
        anotherPrimaryArtist: String(jsonData[i]['Another Primary Artist']),
        featuringArtist: String(jsonData[i]['Featuring Artist']),
        writer: String(jsonData[i].Writer),
        composer: String(jsonData[i].Composer),
        arranger: String(jsonData[i].Arranger),
        producer: String(jsonData[i]['Producer']),
        publisher: String(jsonData[i].Publisher),
        labelName: String(jsonData[i]['Label Name']),
        instrumental: String(jsonData[i].Instrumental),
        trackLanguage: String(jsonData[i]['Track Language']),
        titleLanguage: String(jsonData[i]['Title Language']),
        clipPreviewStartInSeconds: String(
          jsonData[i]['Clip/Preview start in secounds'],
        ),
        primaryTrackType: String(jsonData[i]['Primary Track Type']),
        parentalAdvisory: String(jsonData[i]['Parentail advisory']),
        releaseDate: new Date(jsonData[i]['Release Date']),
      };
      loopData.push(newData);
    }
    await Bulk.insertMany(loopData);
  } catch (error) {
    throw new ApiError(500, error as string);
  }

  return jsonData;
};
const getBulkData = async () => {
  return await Bulk.find({}).lean();
};
export const bulkService = { createBulk, getBulkData };
