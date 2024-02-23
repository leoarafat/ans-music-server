/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import csv from 'csvtojson';
import { Statics } from './statics-model';
const insertIntoDB = async (req: Request) => {
  //@ts-ignore
  const statics = req.files['statics'];

  let staticsData: any[] = [];
  csv()
    .fromFile(statics[0].path)
    .then(async response => {
      for (let i = 0; i < response.length; i++) {
        staticsData.push({
          upc: response[i].UPC,
          isrc: response[i].ISRC,
          label: response[i]['Label Name'],
          artist: response[i]['Artist Name'],
          album: response[i]['Release title'],
          tracks: response[i]['Track title'],
          stream_quantity: response[i].Quantity,
          revenue: response[i]['Net Revenue'],
          country: response[i]['Country / Region'],
        });
      }

      return await Statics.create(staticsData);
    });
};

export const StaticsService = {
  insertIntoDB,
};
// import { Request } from 'express';
// import csv from 'csvtojson';
// import { Statics } from './statics-model';

// const insertIntoDB = async (req: Request) => {
//   //@ts-ignore
//   const statics = req.files['statics'];

//   try {
//     const response = await csv().fromFile(statics[0].path);

//     // Limiting to 10 data entries
//     const entriesToSave = response.slice(0, 10);

//     for (let i = 0; i < entriesToSave.length; i++) {
//       const newData = {
//         upc: entriesToSave[i].UPC,
//         isrc: entriesToSave[i].ISRC,
//         label: entriesToSave[i]['Label Name'],
//         artist: entriesToSave[i]['Artist Name'],
//         album: entriesToSave[i]['Release title'],
//         tracks: entriesToSave[i]['Track title'],
//         stream_quantity: entriesToSave[i].Quantity,
//         revenue: entriesToSave[i]['Net Revenue'],
//         country: entriesToSave[i]['Country / Region'],
//       };

//       // Await the creation of each entry
//       await Statics.create(newData);
//     }

//     console.log('Entries saved successfully.');
//   } catch (error) {
//     console.error('Error saving entries:', error);
//     // Handle error here
//   }
// };

// export const StaticsService = {
//   insertIntoDB,
// };
