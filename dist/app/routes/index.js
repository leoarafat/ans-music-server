"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const single_routes_1 = require("../modules/single-track/single.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const sub_user_routes_1 = require("../modules/sub-user/sub-user.routes");
const album_routes_1 = require("../modules/album/album.routes");
const note_route_1 = require("../modules/note/note.route");
const bulk_routes_1 = require("../modules/builk/bulk.routes");
const manage_routes_1 = require("../modules/manage/manage.routes");
const payments_routes_1 = require("../modules/payments/payments.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/sub-user',
        route: sub_user_routes_1.SubUserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/single-music',
        route: single_routes_1.SingleMusicRoutes,
    },
    {
        path: '/album',
        route: album_routes_1.AlbumRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/note',
        route: note_route_1.NoteRoutes,
    },
    {
        path: '/bulk',
        route: bulk_routes_1.bulkRoutes,
    },
    {
        path: '/manage',
        route: manage_routes_1.ArtistsRoutes,
    },
    {
        path: '/payment',
        route: payments_routes_1.paymentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
