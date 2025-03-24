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
exports.ChatSidebarComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var ChatSidebarComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-chat-sidebar',
            imports: [forms_1.FormsModule, common_1.CommonModule],
            templateUrl: './chat-sidebar.component.html',
            styleUrl: './chat-sidebar.component.css',
            animations: [
                (0, animations_1.trigger)('fadeSlide', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.style)({ opacity: 0, transform: 'translateY(10px)' }),
                        (0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' })),
                    ]),
                    (0, animations_1.transition)(':leave', [
                        (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' }),
                        (0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ opacity: 0, transform: 'translateY(10px)' })),
                    ]),
                ]),
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _contacts_decorators;
    var _contacts_initializers = [];
    var _contacts_extraInitializers = [];
    var _contactClick_decorators;
    var _contactClick_initializers = [];
    var _contactClick_extraInitializers = [];
    var ChatSidebarComponent = _classThis = /** @class */ (function () {
        function ChatSidebarComponent_1() {
            this.searchQuery = '';
            this.contacts = __runInitializers(this, _contacts_initializers, []);
            this.contactClick = (__runInitializers(this, _contacts_extraInitializers), __runInitializers(this, _contactClick_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _contactClick_extraInitializers);
        }
        ChatSidebarComponent_1.prototype.onContactClick = function (contact) {
            this.contactClick.emit(contact);
        };
        Object.defineProperty(ChatSidebarComponent_1.prototype, "filteredContacts", {
            get: function () {
                var _this = this;
                return this.contacts.filter(function (contact) {
                    return contact.userName.toLowerCase().includes(_this.searchQuery.toLowerCase());
                });
            },
            enumerable: false,
            configurable: true
        });
        return ChatSidebarComponent_1;
    }());
    __setFunctionName(_classThis, "ChatSidebarComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _contacts_decorators = [(0, core_1.Input)()];
        _contactClick_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _contacts_decorators, { kind: "field", name: "contacts", static: false, private: false, access: { has: function (obj) { return "contacts" in obj; }, get: function (obj) { return obj.contacts; }, set: function (obj, value) { obj.contacts = value; } }, metadata: _metadata }, _contacts_initializers, _contacts_extraInitializers);
        __esDecorate(null, null, _contactClick_decorators, { kind: "field", name: "contactClick", static: false, private: false, access: { has: function (obj) { return "contactClick" in obj; }, get: function (obj) { return obj.contactClick; }, set: function (obj, value) { obj.contactClick = value; } }, metadata: _metadata }, _contactClick_initializers, _contactClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatSidebarComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatSidebarComponent = _classThis;
}();
exports.ChatSidebarComponent = ChatSidebarComponent;
