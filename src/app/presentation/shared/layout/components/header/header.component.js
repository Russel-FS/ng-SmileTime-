"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/animations");
var HeaderComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-header',
            imports: [common_1.CommonModule],
            templateUrl: './header.component.html',
            styleUrl: './header.component.css',
            animations: [
                (0, animations_1.trigger)('fade', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.style)({ opacity: 0, transform: 'translateY(-10px)' }),
                        (0, animations_1.animate)('600ms ease-out', (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' })),
                    ]),
                    (0, animations_1.transition)(':leave', [
                        (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' }),
                        (0, animations_1.animate)('200ms ease-in', (0, animations_1.style)({ opacity: 0, transform: 'translateY(-10px)' })),
                    ]),
                ]),
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _navigate_decorators;
    var _navigate_initializers = [];
    var _navigate_extraInitializers = [];
    var HeaderComponent = _classThis = /** @class */ (function () {
        function HeaderComponent_1() {
            this.navigate = __runInitializers(this, _navigate_initializers, new core_1.EventEmitter());
            this.isMenuCollapsed = (__runInitializers(this, _navigate_extraInitializers), true);
        }
        HeaderComponent_1.prototype.onNavigate = function (route) {
            this.navigate.emit(route);
            console.log('Navigating to:', route);
        };
        HeaderComponent_1.prototype.showToggle = function () {
            this.isMenuCollapsed = !this.isMenuCollapsed;
        };
        return HeaderComponent_1;
    }());
    __setFunctionName(_classThis, "HeaderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _navigate_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _navigate_decorators, { kind: "field", name: "navigate", static: false, private: false, access: { has: function (obj) { return "navigate" in obj; }, get: function (obj) { return obj.navigate; }, set: function (obj, value) { obj.navigate = value; } }, metadata: _metadata }, _navigate_initializers, _navigate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
}();
exports.HeaderComponent = HeaderComponent;
