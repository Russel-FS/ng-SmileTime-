"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var node_1 = require("@angular/ssr/node");
var express_1 = require("express");
var cors_1 = require("cors");
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var main_server_1 = require("./main.server");
var serverDistFolder = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url));
var browserDistFolder = (0, node_path_1.resolve)(serverDistFolder, '../browser');
var indexHtml = (0, node_path_1.join)(serverDistFolder, 'index.server.html');
var app = (0, express_1.default)();
var commonEngine = new node_1.CommonEngine();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));
/**
 * Example Express  Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
/**
 * Serve static files from /browser
 */
app.get('**', express_1.default.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
}));
/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', function (req, res, next) {
    var protocol = req.protocol, originalUrl = req.originalUrl, baseUrl = req.baseUrl, headers = req.headers;
    commonEngine
        .render({
        bootstrap: main_server_1.default,
        documentFilePath: indexHtml,
        url: "".concat(protocol, "://").concat(headers.host).concat(originalUrl),
        publicPath: browserDistFolder,
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: baseUrl }],
    })
        .then(function (html) { return res.send(html); })
        .catch(function (err) { return next(err); });
});
/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if ((0, node_1.isMainModule)(import.meta.url)) {
    var port_1 = process.env['PORT'] || 4000;
    app.listen(port_1, function () {
        console.log("Node Express server listening on http://localhost:".concat(port_1));
    });
}
exports.default = app;
