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
exports.ManageRealtimeMessageUseCase = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ManageRealtimeMessageUseCase = function () {
    var _classDecorators = [(0, core_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ManageRealtimeMessageUseCase = _classThis = /** @class */ (function () {
        function ManageRealtimeMessageUseCase_1(realTimeCommunication, messageRepository) {
            this.realTimeCommunication = realTimeCommunication;
            this.messageRepository = messageRepository;
        }
        ManageRealtimeMessageUseCase_1.prototype.initializeConnection = function () {
            this.realTimeCommunication.connect();
        };
        ManageRealtimeMessageUseCase_1.prototype.closeConnection = function () {
            this.realTimeCommunication.disconnect();
        };
        ManageRealtimeMessageUseCase_1.prototype.listenForMessages = function () {
            return this.realTimeCommunication.onMessage().pipe((0, rxjs_1.map)(function (message) {
                if (!message) {
                    throw new Error('Mensaje recibido es nulo o indefinido');
                }
                return message;
            }), (0, rxjs_1.catchError)(function (error) {
                console.error('Error al recibir mensaje:', error);
                return (0, rxjs_1.throwError)(function () { return error; });
            }));
        };
        /**
         * Envia un mensaje a traves del SignalR. Primero se guarda el mensaje en
         * la base de datos y luego se envia a traves del SignalR. El mensaje
         * guardado se devuelve como Observable.
         */
        ManageRealtimeMessageUseCase_1.prototype.sendMessage = function (message) {
            if (!message) {
                return (0, rxjs_1.throwError)(function () { return new Error('El mensaje no puede ser nulo'); });
            }
            return this.messageRepository.sendMessage(message).pipe((0, rxjs_1.catchError)(function (error) {
                console.error('Error al enviar mensaje:', error);
                return (0, rxjs_1.throwError)(function () { return error; });
            }));
        };
        /**
        * Envía un mensaje a través de SignalR.
        * @param message El mensaje a enviar.
        */
        ManageRealtimeMessageUseCase_1.prototype.broadcastMessage = function (message) {
            this.realTimeCommunication.sendMessage(message);
        };
        return ManageRealtimeMessageUseCase_1;
    }());
    __setFunctionName(_classThis, "ManageRealtimeMessageUseCase");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ManageRealtimeMessageUseCase = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ManageRealtimeMessageUseCase = _classThis;
}();
exports.ManageRealtimeMessageUseCase = ManageRealtimeMessageUseCase;
