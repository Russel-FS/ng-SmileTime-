"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var layout_component_1 = require("./presentation/shared/layout/containers/layout/layout.component");
var home_component_1 = require("./presentation/pages/home/home.component");
var about_component_1 = require("./presentation/pages/about/about.component");
var contact_component_1 = require("./presentation/pages/contact/contact.component");
var client_routes_1 = require("./presentation/pages/client/client.routes");
var dentis_routes_1 = require("./presentation/pages/dentist/dentis.routes");
var auth_routes_1 = require("./presentation/pages/auth/auth.routes");
var search_component_1 = require("./presentation/components/search/search.component");
exports.routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'about', component: about_component_1.AboutComponent },
            { path: 'contact', component: contact_component_1.ContactComponent },
        ],
    },
    {
        path: 'auth',
        children: auth_routes_1.authRoutes,
    },
    {
        path: 'client',
        children: client_routes_1.clientRoutes,
    },
    {
        path: 'dentist',
        children: dentis_routes_1.dentistRoutes,
    },
    {
        path: 'search',
        component: search_component_1.SearchComponent,
    },
];
