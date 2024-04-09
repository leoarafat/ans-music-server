"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkService = void 0;
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
const bulk_model_1 = require("./bulk.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createBulk = (req) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    // console.log(req.files['bulk']);
    const bulks = req.files['bulk'];
    if (!bulks[0].originalname.endsWith('.xlsx')) {
        throw new ApiError_1.default(400, 'Invalid file format. Only .xlsx files are allowed.');
    }
    const excelData = (0, convert_excel_to_json_1.default)({
        sourceFile: bulks[0].path,
    });
    // Extracting the sheet name dynamically
    const sheetName = Object.keys(excelData)[0];
    const sheet = excelData[sheetName];
    // Extracting the header row
    const headerRow = sheet[1];
    // Mapping each row to an object using the header row keys
    const jsonData = sheet.slice(1).map((row) => {
        const obj = {};
        Object.keys(headerRow).forEach(key => {
            obj[headerRow[key]] = row[key];
        });
        return obj;
    });
    try {
        const loopData = [];
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
                clipPreviewStartInSeconds: String(jsonData[i]['Clip/Preview start in secounds']),
                primaryTrackType: String(jsonData[i]['Primary Track Type']),
                parentalAdvisory: String(jsonData[i]['Parentail advisory']),
                releaseDate: new Date(jsonData[i]['Release Date']),
            };
            loopData.push(newData);
        }
        yield bulk_model_1.Bulk.insertMany(loopData);
    }
    catch (error) {
        throw new ApiError_1.default(500, error);
    }
    return jsonData;
});
const getBulkData = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bulk_model_1.Bulk.find({});
});
exports.bulkService = { createBulk, getBulkData };
