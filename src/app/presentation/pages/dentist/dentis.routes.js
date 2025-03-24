"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dentistRoutes = void 0;
var dashboard_component_1 = require("./dashboard/dashboard.component");
var patients_component_1 = require("./patients/patients.component");
var profile_component_1 = require("./profile/profile.component");
var schedule_component_1 = require("./schedule/schedule.component");
var dentist_chat_component_1 = require("./dentist-chat/dentist-chat.component");
exports.dentistRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'patients', component: patients_component_1.PatientsComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'schedule', component: schedule_component_1.ScheduleComponent },
    { path: 'chat', component: dentist_chat_component_1.DentistChatComponent },
];
