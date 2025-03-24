"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ContactDataSource = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ContactDataSource = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ContactDataSource = _classThis = /** @class */ (function () {
        function ContactDataSource_1() {
            this.apiUrl = 'api/messages';
            this.mockContacts = [
                {
                    userId: 1,
                    userName: 'Russel',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                    lastActive: new Date(),
                    selected: true,
                    conversationId: '1',
                    isOnline: true,
                },
                {
                    userId: 2,
                    userName: 'Solano',
                    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
                    lastActive: new Date(),
                    selected: false,
                    conversationId: 1,
                },
                {
                    userId: 3,
                    userName: 'Freddy',
                    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                    lastActive: new Date(),
                    selected: false,
                    conversationId: 2,
                },
            ];
        }
        ContactDataSource_1.prototype.getContacts = function () {
            var _this = this;
            return new rxjs_1.Observable(function (observer) {
                observer.next(_this.mockContacts);
                observer.complete();
            });
        };
        ContactDataSource_1.prototype.getContact = function (id) {
            var _this = this;
            return new rxjs_1.Observable(function (observer) {
                var contact = _this.mockContacts.find(function (c) { return c.userId === Number(id); });
                if (contact) {
                    observer.next(contact);
                }
                else {
                    observer.error('Contact not found');
                }
                observer.complete();
            });
        };
        ContactDataSource_1.prototype.createContact = function (contact) {
            var _this = this;
            return new rxjs_1.Observable(function (observer) {
                var newContact = __assign(__assign({}, contact), { id: _this.mockContacts.length + 1 });
                _this.mockContacts.push(newContact);
                observer.next(newContact);
                observer.complete();
            });
        };
        ContactDataSource_1.prototype.updateContact = function (contact) {
            var _this = this;
            return new rxjs_1.Observable(function (observer) {
                var index = _this.mockContacts.findIndex(function (c) { return c.userId === contact.userId; });
                if (index !== -1) {
                    _this.mockContacts[index] = contact;
                    observer.next(contact);
                }
                else {
                    observer.error('Contact not found');
                }
                observer.complete();
            });
        };
        ContactDataSource_1.prototype.deleteContact = function (id) {
            var _this = this;
            return new rxjs_1.Observable(function (observer) {
                var index = _this.mockContacts.findIndex(function (c) { return c.userId === Number(id); });
                if (index !== -1) {
                    _this.mockContacts.splice(index, 1);
                    observer.next();
                }
                else {
                    observer.error('Contact not found');
                }
                observer.complete();
            });
        };
        return ContactDataSource_1;
    }());
    __setFunctionName(_classThis, "ContactDataSource");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactDataSource = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactDataSource = _classThis;
}();
exports.ContactDataSource = ContactDataSource;
