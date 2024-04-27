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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const note_model_1 = require("./note.model");
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield note_model_1.Note.create(payload);
});
const notes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield note_model_1.Note.find({});
});
const singleNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNote = yield note_model_1.Note.findById(id);
    if (!checkNote) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Note not found');
    }
    return yield note_model_1.Note.findById(id);
});
const deleteNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNote = yield note_model_1.Note.findById(id);
    if (!checkNote) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Note not found');
    }
    return yield note_model_1.Note.findByIdAndDelete(id);
});
const updateNote = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNote = yield note_model_1.Note.findById(id);
    if (!checkNote) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Note not found');
    }
    const noteData = __rest(payload, []);
    const result = yield note_model_1.Note.findOneAndUpdate({ _id: id }, noteData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.noteService = {
    insertIntoDB,
    notes,
    singleNote,
    deleteNote,
    updateNote,
};
