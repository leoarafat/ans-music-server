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
exports.LabelService = void 0;
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const uniqueId_1 = require("../../../utils/uniqueId");
const label_model_1 = require("./label.model");
const addLabel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.labelId = (0, uniqueId_1.generateLabelId)();
    return yield label_model_1.Label.create(payload);
});
const updateLabel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIsExist = yield label_model_1.Label.findById(id);
    if (!checkIsExist) {
        throw new ApiError_1.default(404, 'Label not found');
    }
    const LabelData = __rest(payload, []);
    return yield label_model_1.Label.findOneAndUpdate({ _id: id }, LabelData, {
        new: true,
        runValidators: true,
    });
});
const getLabel = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const labelQuery = new QueryBuilder_1.default(label_model_1.Label.find({ user: id }), query)
        .search(['labelName'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield labelQuery.modelQuery;
    const meta = yield labelQuery.countTotal();
    return {
        meta,
        data: result,
    };
});
exports.LabelService = {
    addLabel,
    updateLabel,
    getLabel,
};
