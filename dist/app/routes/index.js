"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const single_routes_1 = require("../modules/single-track/single.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const sub_user_routes_1 = require("../modules/sub-user/sub-user.routes");
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
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/music',
        route: single_routes_1.SingleMusicRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
