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
exports.MessageDataSource = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var message_mock_1 = require("../../../core/domain/model/chat/__mocks__/message.mock");
var conversation_entity_1 = require("../../../core/domain/model/chat/conversation-entity");
var MessageDataSource = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MessageDataSource = _classThis = /** @class */ (function () {
        function MessageDataSource_1(http) {
            this.http = http;
            this.apiUrl = 'api/messages';
        }
        //test datos de prueba
        MessageDataSource_1.prototype.getMessages = function () {
            return new rxjs_1.Observable(function (observer) {
                observer.next([message_mock_1.mockMessage]);
                observer.complete();
            });
        };
        MessageDataSource_1.prototype.getMessage = function (id) {
            return new rxjs_1.Observable(function (observer) {
                observer.next(message_mock_1.mockMessage);
                observer.complete();
            });
        };
        MessageDataSource_1.prototype.sendMessage = function (message) {
            return new rxjs_1.Observable(function (observer) {
                var mockConversation = {
                    id: '2',
                    participants: [],
                    messages: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true,
                    type: conversation_entity_1.ConversationType.INDIVIDUAL,
                    title: "mensaje",
                };
                observer.next(mockConversation);
                observer.complete();
            });
        };
        return MessageDataSource_1;
    }());
    __setFunctionName(_classThis, "MessageDataSource");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessageDataSource = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessageDataSource = _classThis;
}();
exports.MessageDataSource = MessageDataSource;
