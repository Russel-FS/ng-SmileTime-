"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = void 0;
var book_component_1 = require("./appointments/book/book.component");
var history_component_1 = require("./appointments/history/history.component");
var calendar_component_1 = require("./appointments/calendar/calendar.component");
var profile_component_1 = require("./profile/profile.component");
var medical_history_component_1 = require("./medical-history/medical-history.component");
var client_chat_component_1 = require("./client-chat/client-chat.component");
exports.clientRoutes = [
    {
        path: 'appointments',
        children: [
            { path: 'book', component: book_component_1.BookComponent },
            { path: 'history', component: history_component_1.HistoryComponent },
            { path: 'calendar', component: calendar_component_1.CalendarComponent },
        ],
    },
    { path: 'medical-history', component: medical_history_component_1.MedicalHistoryComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'chat', component: client_chat_component_1.ClientChatComponent },
];
