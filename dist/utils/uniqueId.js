"use strict";
// export function generateArtistId() {
//   const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExternalId = exports.generateTransactionId = exports.generateLabelId = exports.generateArtistId = void 0;
//   return randomSixDigits;
// }
// let nextId = 1000;
// export function generateArtistId() {
//   return nextId++;
// }
// export const findLastFacultyId = async (): Promise<string | undefined> => {
//   const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();
//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };
// //generate faculty id
// export const generateFacultyId = async (): Promise<string> => {
//   const currentId =
//     (await findLastFacultyId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `F-${incrementedId}`;
//   return incrementedId;
// };
const usedCodes = new Set();
function generateArtistId() {
    let code;
    do {
        code = Math.floor(1000 + Math.random() * 9000);
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
}
exports.generateArtistId = generateArtistId;
function generateLabelId() {
    let code;
    do {
        code = Math.floor(1000 + Math.random() * 9000);
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
}
exports.generateLabelId = generateLabelId;
//! Transaction id
function generateTransactionId() {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5);
    return `${timestamp}${randomString}`.toUpperCase();
}
exports.generateTransactionId = generateTransactionId;
function generateExternalId() {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substr(2, 8);
    return `${timestamp}${randomString}`.toUpperCase();
}
exports.generateExternalId = generateExternalId;
