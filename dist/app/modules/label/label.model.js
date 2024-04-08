"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const mongoose_1 = require("mongoose");
const labelSchemaSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    labelId: {
        type: Number,
        required: true,
    },
    labelName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Label = (0, mongoose_1.model)('Label', labelSchemaSchema);
