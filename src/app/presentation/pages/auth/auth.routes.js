"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var recovery_component_1 = require("./recovery/recovery.component");
const path = require("path");
exports.authRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'recovery', component: recovery_component_1.RecoveryComponent },
];
