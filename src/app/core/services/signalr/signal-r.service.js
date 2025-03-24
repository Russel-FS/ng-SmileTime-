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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalRService = void 0;
var core_1 = require("@angular/core");
var signalR = require("@microsoft/signalr");
var rxjs_1 = require("rxjs");
var SignalRService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SignalRService = _classThis = /** @class */ (function () {
        function SignalRService_1(apiUrl, storageService) {
            this.apiUrl = apiUrl;
            this.storageService = storageService;
            this.messageReceived = new rxjs_1.Subject();
            this.typingStatus = new rxjs_1.Subject();
        }
        SignalRService_1.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            // si ya existe una conexión activa, no se intenta crear una nueva
                            if (((_a = this.hubConnection) === null || _a === void 0 ? void 0 : _a.state) === signalR.HubConnectionState.Connected) {
                                console.log('Ya existe una conexión SignalR activa');
                                return [2 /*return*/];
                            }
                            // crea una nueva conexión con el hub de SignalR
                            this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl(this.apiUrl.getEndpoint('chatHub'), {
                                accessTokenFactory: function () { return _this.storageService.getToken(); },
                                transport: signalR.HttpTransportType.WebSockets,
                            })
                                .withAutomaticReconnect([0, 2000, 5000, 10000])
                                .configureLogging(signalR.LogLevel.Debug)
                                .build();
                            // eventos de reconexión
                            this.setupConnectionEvents();
                            //  iniciar la conexión
                            return [4 /*yield*/, this.hubConnection.start().then(function () {
                                    console.log('Conexión SignalR iniciada');
                                })];
                        case 1:
                            //  iniciar la conexión
                            _b.sent();
                            // listener de mensajes
                            this.setupMessageListener();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _b.sent();
                            console.error('Error al iniciar la conexión:');
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SignalRService_1.prototype.setupConnectionEvents = function () {
            this.hubConnection.onreconnecting(function (error) {
                console.log('Intentando reconectar...', error);
            });
            this.hubConnection.onreconnected(function (connectionId) {
                console.log('Reconectado exitosamente. ID:', connectionId);
            });
            this.hubConnection.onclose(function (error) {
                console.log('Conexión cerrada:', error);
            });
        };
        SignalRService_1.prototype.disconnect = function () {
            if (this.hubConnection) {
                this.hubConnection
                    .stop()
                    .then(function () { return console.log('Coneccion detenida'); })
                    .catch(function (err) { return console.log('Error al detener la coneccion: ' + err); });
            }
        };
        SignalRService_1.prototype.onMessage = function () {
            return this.messageReceived.asObservable();
        };
        /**
         * Envia un mensaje a un usuario a traves del hub de SignalR. Si no se ha
         * establecido una coneccion con el hub, el mensaje no se envia.
         * @param message El texto del mensaje que se va a enviar.
         */
        SignalRService_1.prototype.sendMessage = function (message) {
            if (this.hubConnection) {
                this.hubConnection
                    .invoke('SendMessage', message)
                    .then(function () { return console.log('Mensaje enviado'); })
                    .catch(function (err) { return console.log('Error al enviar el mensaje: ' + err); });
            }
        };
        // listener para el estado de typing
        SignalRService_1.prototype.onTypingStatus = function () {
            return this.typingStatus.asObservable();
        };
        // envia un estado de typing
        SignalRService_1.prototype.setTypingStatus = function (userId, isTyping) {
            if (this.hubConnection) {
                this.hubConnection
                    .invoke('UserTyping', userId, isTyping)
                    .then(function () { return console.log('Estado de typing actualizado'); })
                    .catch(function (err) { return console.log('Error al actualizar el estado de typing: ' + err); });
            }
        };
        /**
         * Establece un listener para recibir mensajes de SignalR. Cuando se recibe
         * un mensaje, se notifica a los subscriptores de `messageReceived` con un
         * objeto `Message` que contiene el texto del mensaje
         */
        SignalRService_1.prototype.setupMessageListener = function () {
            var _this = this;
            // listener de mensajes
            this.hubConnection.on('ReceiveMessage', function (message) {
                _this.messageReceived.next(message);
            });
            // listener de estado de typing
            this.hubConnection.on('UserTypingStatus', function (userId, isTyping) {
                _this.typingStatus.next({ userId: userId, isTyping: isTyping });
            });
        };
        return SignalRService_1;
    }());
    __setFunctionName(_classThis, "SignalRService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SignalRService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SignalRService = _classThis;
}();
exports.SignalRService = SignalRService;
