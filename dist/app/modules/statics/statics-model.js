"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excel = void 0;
const mongoose_1 = require("mongoose");
const singleMusicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});
exports.Excel = (0, mongoose_1.model)('Excel', singleMusicSchema);
