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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/animations");
var router_1 = require("@angular/router");
var i_auth_repository_1 = require("../../../../core/interfaces/repositorys/auth/i-auth-repository");
var auth_repository_1 = require("../../../../data/repositories/auth/auth.repository");
var i_auth_service_1 = require("../../../../core/interfaces/datasource/auth/i-auth-service");
var auth_service_1 = require("../../../../infrastructure/datasources/auth/auth.service");
var common_1 = require("@angular/common");
var LoginComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-login',
            standalone: true,
            imports: [forms_1.ReactiveFormsModule, router_1.RouterModule, common_1.CommonModule],
            templateUrl: './login.component.html',
            styleUrl: './login.component.css',
            providers: [
                {
                    provide: i_auth_repository_1.IAuthRepository,
                    useClass: auth_repository_1.AuthRepository,
                },
                {
                    provide: i_auth_service_1.IAuthService,
                    useClass: auth_service_1.AuthService,
                },
            ],
            animations: [
                (0, animations_1.trigger)('fadeAnimation', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.style)({ opacity: 0, transform: 'translateY(20px)' }),
                        (0, animations_1.animate)('500ms ease-in-out', (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' })),
                    ]),
                    (0, animations_1.transition)(':leave', [
                        (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' }),
                        (0, animations_1.animate)('500ms ease-in-out', (0, animations_1.style)({ opacity: 0, transform: 'translateY(20px)' })),
                    ])
                ]),
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoginComponent = _classThis = /** @class */ (function () {
        function LoginComponent_1(AuthService, fb, router, notificationService, storageService, signalR) {
            this.AuthService = AuthService;
            this.fb = fb;
            this.router = router;
            this.notificationService = notificationService;
            this.storageService = storageService;
            this.signalR = signalR;
            this.loading = false;
            this.loginForm = this.fb.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                password: [
                    '',
                    [
                        forms_1.Validators.required,
                        forms_1.Validators.minLength(6),
                        forms_1.Validators.maxLength(20),
                        forms_1.Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/),
                    ],
                ],
            });
        }
        LoginComponent_1.prototype.onSubmit = function () {
            var _this = this;
            if (this.loginForm.invalid) {
                this.markFormGroupTouched(this.loginForm);
                return;
            }
            this.loading = true;
            this.AuthService.login(this.loginForm.value).subscribe({
                next: function (response) {
                    _this.success(response);
                },
                error: function (error) {
                    _this.error(error);
                },
                complete: function () {
                    _this.complete();
                },
            });
        };
        LoginComponent_1.prototype.markFormGroupTouched = function (formGroup) {
            var _this = this;
            Object.values(formGroup.controls).forEach(function (control) {
                control.markAsTouched();
                if (control instanceof forms_1.FormGroup) {
                    _this.markFormGroupTouched(control);
                }
            });
        };
        LoginComponent_1.prototype.success = function (response) {
            console.log(response);
            this.storageService.setAuthData(response);
            this.notificationService.success('Inicio de sesión exitoso, bienvenido');
            this.router.navigate(['/home']);
        };
        LoginComponent_1.prototype.error = function (error) {
            var errorMessage = error.error.messageResponse || 'Error desconocido';
            this.loading = false; // carga 
            this.notificationService.error(errorMessage); // mensaje de notificacion
        };
        LoginComponent_1.prototype.complete = function () {
            this.loading = false;
        };
        LoginComponent_1.prototype.getErrorMessage = function (controlName) {
            var control = this.loginForm.get(controlName);
            if (control === null || control === void 0 ? void 0 : control.hasError('required')) {
                return 'Este campo es requerido';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('email')) {
                return 'Email no válido';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('minlength')) {
                return 'La contraseña debe tener al menos 6 caracteres';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('pattern')) {
                return 'La contraseña debe contener mayúsculas y minúsculas';
            }
            return '';
        };
        return LoginComponent_1;
    }());
    __setFunctionName(_classThis, "LoginComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginComponent = _classThis;
}();
exports.LoginComponent = LoginComponent;
