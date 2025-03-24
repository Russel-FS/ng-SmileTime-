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
exports.ManageTypingStatusUseCase = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ManageTypingStatusUseCase = function () {
    var _classDecorators = [(0, core_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ManageTypingStatusUseCase = _classThis = /** @class */ (function () {
        function ManageTypingStatusUseCase_1(realTimeCommunication) {
            this.realTimeCommunication = realTimeCommunication;
            this.typingSubject = new rxjs_1.Subject(); // Observable para notificar el estado de escritura
            this.TYPING_DEBOUNCE_TIME = 300; // 300ms de debounce
            this.setupTypingDebounce();
        }
        ManageTypingStatusUseCase_1.prototype.setupTypingDebounce = function () {
            var _this = this;
            this.typingSubject
                .pipe((0, rxjs_1.debounceTime)(this.TYPING_DEBOUNCE_TIME), (0, rxjs_1.switchMap)(function (_a) {
                var userId = _a.userId, isTyping = _a.isTyping;
                if (isTyping) {
                    return (0, rxjs_1.timer)(0, 1500).pipe((0, rxjs_1.map)(function (index) { return ({
                        userId: userId,
                        isTyping: index === 0,
                    }); }));
                }
                return (0, rxjs_1.of)({ userId: userId, isTyping: isTyping });
            }), (0, rxjs_1.distinctUntilChanged)(function (prev, curr) {
                return prev.isTyping === curr.isTyping && prev.userId === curr.userId;
            }), (0, rxjs_1.catchError)(function (error) {
                console.error('Error al procesar la escritura:', error);
                return (0, rxjs_1.of)({ userId: '', isTyping: false });
            }))
                .subscribe(function (_a) {
                var userId = _a.userId, isTyping = _a.isTyping;
                // console.log(isTyping ? 'El usuario está escribiendo...' : 'El usuario dejó de escribir.'); // 🖨️ Mostrar en consola
                _this.realTimeCommunication.setTypingStatus(userId, isTyping);
            });
        };
        /**
         * Cuando el usuario escribe algo, se debe llamar a este m todo para
         * notificar el estado de escritura. La suscripci n a este observable
         * se encarga de procesar el evento de escritura y notificar el estado
         * de "escribiendo" o "no escribiendo" al servidor.
         */
        ManageTypingStatusUseCase_1.prototype.notifyTyping = function (userId, isTyping) {
            this.typingSubject.next({ userId: userId, isTyping: isTyping });
        };
        /**
         * Devuelve un observable que se suscribe al estado de escritura en el chat.
         * Cada vez que un usuario comienza o deja de escribir, se emite un objeto
         * con el userId correspondiente y una propiedad "isTyping" que indica
         * si el usuario est  escribiendo o no.
         */
        ManageTypingStatusUseCase_1.prototype.listenTypingStatus = function () {
            return this.realTimeCommunication.onTypingStatus();
        };
        return ManageTypingStatusUseCase_1;
    }());
    __setFunctionName(_classThis, "ManageTypingStatusUseCase");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ManageTypingStatusUseCase = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ManageTypingStatusUseCase = _classThis;
}();
exports.ManageTypingStatusUseCase = ManageTypingStatusUseCase;
