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
exports.ChatMessagesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/animations");
var typing_component_1 = require("../typing/typing.component");
var message_status_1 = require("../../../../core/domain/model/chat/message-status");
var ChatMessagesComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-chat-messages',
            imports: [forms_1.FormsModule, common_1.CommonModule, typing_component_1.TypingComponent],
            templateUrl: './chat-messages.component.html',
            styleUrl: './chat-messages.component.css',
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
    var _messageContainer_decorators;
    var _messageContainer_initializers = [];
    var _messageContainer_extraInitializers = [];
    var _messages_decorators;
    var _messages_initializers = [];
    var _messages_extraInitializers = [];
    var _isTyping_decorators;
    var _isTyping_initializers = [];
    var _isTyping_extraInitializers = [];
    var ChatMessagesComponent = _classThis = /** @class */ (function () {
        function ChatMessagesComponent_1() {
            this.messageContainer = __runInitializers(this, _messageContainer_initializers, void 0);
            this.messages = (__runInitializers(this, _messageContainer_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
            this.isTyping = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _isTyping_initializers, false));
            __runInitializers(this, _isTyping_extraInitializers);
        }
        ChatMessagesComponent_1.prototype.onScroll = function () {
            this.checkScrollPosition();
        };
        ChatMessagesComponent_1.prototype.ngAfterViewChecked = function () {
            // this.scrollToBottom();
        };
        ChatMessagesComponent_1.prototype.checkScrollPosition = function () {
            var container = this.messageContainer.nativeElement;
            var isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        };
        ChatMessagesComponent_1.prototype.scrollToBottom = function () {
            try {
                this.messageContainer.nativeElement.scrollTop =
                    this.messageContainer.nativeElement.scrollHeight;
            }
            catch (err) { }
        };
        ChatMessagesComponent_1.prototype.isUserMessage = function (message) {
            return message.status.some(function (element) { return element.status === message_status_1.Status.SENT; });
        };
        ChatMessagesComponent_1.prototype.trackByMessageId = function (message) {
            var _a;
            return ((_a = message === null || message === void 0 ? void 0 : message.id) === null || _a === void 0 ? void 0 : _a.toString()) || message.createdAt.getTime().toString();
        };
        return ChatMessagesComponent_1;
    }());
    __setFunctionName(_classThis, "ChatMessagesComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _messageContainer_decorators = [(0, core_1.ViewChild)('messageContainer')];
        _messages_decorators = [(0, core_1.Input)()];
        _isTyping_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _messageContainer_decorators, { kind: "field", name: "messageContainer", static: false, private: false, access: { has: function (obj) { return "messageContainer" in obj; }, get: function (obj) { return obj.messageContainer; }, set: function (obj, value) { obj.messageContainer = value; } }, metadata: _metadata }, _messageContainer_initializers, _messageContainer_extraInitializers);
        __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: function (obj) { return "messages" in obj; }, get: function (obj) { return obj.messages; }, set: function (obj, value) { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
        __esDecorate(null, null, _isTyping_decorators, { kind: "field", name: "isTyping", static: false, private: false, access: { has: function (obj) { return "isTyping" in obj; }, get: function (obj) { return obj.isTyping; }, set: function (obj, value) { obj.isTyping = value; } }, metadata: _metadata }, _isTyping_initializers, _isTyping_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatMessagesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatMessagesComponent = _classThis;
}();
exports.ChatMessagesComponent = ChatMessagesComponent;
