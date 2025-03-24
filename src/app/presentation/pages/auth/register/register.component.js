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
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/animations");
var router_1 = require("@angular/router");
var i_auth_repository_1 = require("../../../../core/interfaces/repositorys/auth/i-auth-repository");
var auth_repository_1 = require("../../../../data/repositories/auth/auth.repository");
var i_auth_service_1 = require("../../../../core/interfaces/datasource/auth/i-auth-service");
var auth_service_1 = require("../../../../infrastructure/datasources/auth/auth.service");
var common_1 = require("@angular/common");
var RegisterComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-register',
            standalone: true,
            imports: [forms_1.ReactiveFormsModule, router_1.RouterModule, common_1.CommonModule],
            templateUrl: './register.component.html',
            styleUrl: './register.component.css',
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
    var RegisterComponent = _classThis = /** @class */ (function () {
        function RegisterComponent_1(AuthService, fb, router, notificationService, cd) {
            this.AuthService = AuthService;
            this.fb = fb;
            this.router = router;
            this.notificationService = notificationService;
            this.cd = cd;
            this.loading = false;
        }
        RegisterComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            console.log('Inicializando registerForm...');
            this.registerForm = this.fb.group({
                fullName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                password: ['', {
                        validators: [
                            forms_1.Validators.required,
                            forms_1.Validators.minLength(6),
                            forms_1.Validators.maxLength(20),
                            forms_1.Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/)
                        ]
                    }],
                confirmPassword: ['', {
                        validators: [forms_1.Validators.required]
                    }]
            }, {
                validators: function (formGroup) {
                    return _this.passwordsMatchValidator(formGroup);
                }
            });
        };
        /**
         *  valida que las contraseñas coincidan
         * @param formGroup - el FormGroup que contiene los campos 'password' y 'confirmPassword'
         * @returns un objeto ValidationErrors si las contraseñas no coinciden, null en caso contrario
         */
        RegisterComponent_1.prototype.passwordsMatchValidator = function (formGroup) {
            var password = formGroup.get('password');
            var confirmPassword = formGroup.get('confirmPassword');
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                confirmPassword.setErrors({ mismatch: true });
                return { mismatch: true };
            }
            return null;
        };
        RegisterComponent_1.prototype.onSubmit = function () {
            var _this = this;
            console.log('Formulario válido:', this.registerForm.valid);
            console.log('Valores del formulario:', this.registerForm.value);
            if (this.registerForm.invalid) {
                this.markFormGroupTouched(this.registerForm);
                return;
            }
            this.loading = true;
            this.AuthService.register(this.registerForm.value).subscribe({
                next: function () {
                    _this.notificationService.success('Registro exitoso, ahora puedes iniciar sesión');
                    _this.router.navigate(['/login']);
                },
                error: function () {
                    _this.loading = false;
                    _this.notificationService.error('Error al registrar usuario');
                },
                complete: function () {
                    _this.loading = false;
                },
            });
        };
        /**
         * marca los controles del formulario como tocados
         * @param formGroup - el FormGroup que contiene los controles que se van a marcar como tocados
         */
        RegisterComponent_1.prototype.markFormGroupTouched = function (formGroup) {
            var _this = this;
            Object.values(formGroup.controls).forEach(function (control) {
                control.markAsTouched();
                if (control instanceof forms_1.FormGroup) {
                    _this.markFormGroupTouched(control);
                }
            });
        };
        /**
         * devuelve un mensaje de error basado en el controlName.
         *
         * @param controlName - el control que se va a validar.
         * @returns mensaje de error basado en el controlName
         *            'Este campo es requerido'
         *            'Email no válido'
         *            'Debe tener al menos 6 caracteres' y otras validaciones
         */
        RegisterComponent_1.prototype.getErrorMessage = function (controlName) {
            var control = this.registerForm.get(controlName);
            if (control === null || control === void 0 ? void 0 : control.hasError('required')) {
                return 'Este campo es requerido';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('email')) {
                return 'Email no válido';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('minlength')) {
                return 'Debe tener al menos 6 caracteres';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('pattern')) {
                return 'Debe contener mayúsculas y minúsculas';
            }
            if (control === null || control === void 0 ? void 0 : control.hasError('mismatch')) {
                return 'Las contraseñas no coinciden';
            }
            return '';
        };
        return RegisterComponent_1;
    }());
    __setFunctionName(_classThis, "RegisterComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RegisterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RegisterComponent = _classThis;
}();
exports.RegisterComponent = RegisterComponent;
