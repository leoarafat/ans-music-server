"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const manage_controller_1 = require("./manage.controller");
const label_controller_1 = require("../label/label.controller");
const router = express_1.default.Router();
router.post('/add-artist', manage_controller_1.PrimaryArtistController.addPrimaryArtist);
router.get('/get-artist/:id', manage_controller_1.PrimaryArtistController.getPrimaryArtist);
router.patch('/edit-artist/:id', manage_controller_1.PrimaryArtistController.updatePrimaryArtist);
router.patch('/edit-writer/:id', manage_controller_1.PrimaryArtistController.updateWriter);
//! Label
router.post('/add-label', label_controller_1.LabelController.addLabel);
router.get('/get-label/:id', label_controller_1.LabelController.getLabel);
router.patch('/edit-label/:id', label_controller_1.LabelController.updateLabel);
exports.ArtistsRoutes = router;
