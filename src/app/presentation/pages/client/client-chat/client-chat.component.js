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
exports.ClientChatComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var chat_sidebar_component_1 = require("../../../components/chat/chat-sidebar/chat-sidebar.component");
var chat_messages_component_1 = require("../../../components/chat/chat-messages/chat-messages.component");
var i_message_repository_1 = require("../../../../core/interfaces/repositorys/chat/i-message.repository");
var message_repository_1 = require("../../../../data/repositories/chat/message.repository");
var user_contact_repository_1 = require("../../../../data/repositories/chat/user-contact.repository");
var contact_service_1 = require("../../../../infrastructure/datasources/chat/contact.service");
var i_message_datasource_1 = require("../../../../core/interfaces/datasource/auth/i-message-datasource");
var signal_r_service_1 = require("../../../../core/services/signalr/signal-r.service");
var i_real_time_comunication_1 = require("../../../../core/interfaces/signalR/i-real-time-comunication");
var manage_realtime_message_use_case_1 = require("../../../../core/use-cases/signalR/manage-realtime-message-use-case");
var manage_typing_status_use_case_1 = require("../../../../core/use-cases/signalR/manage-typing-status-use-case");
var i_user_repository_1 = require("../../../../core/interfaces/repositorys/chat/i-user-repository");
var I_user_datasource_1 = require("../../../../core/interfaces/datasource/chat/I-user-datasource");
var message_entity_1 = require("../../../../core/domain/model/chat/message-entity");
var conversation_entity_1 = require("../../../../core/domain/model/chat/conversation-entity");
var conversation_participant_1 = require("../../../../core/domain/model/chat/conversation-participant");
var message_status_1 = require("../../../../core/domain/model/chat/message-status");
var rxjs_1 = require("rxjs");
var contacts_use_case_1 = require("../../../../core/use-cases/chat/contacts-use-case");
var chat_header_component_1 = require("../../../components/chat/chat-header/chat-header.component");
var chat_input_component_1 = require("../../../components/chat/chat-input/chat-input.component");
var conversation_use_case_1 = require("../../../../core/use-cases/chat/conversation-use-case");
var i_conversation_repository_1 = require("../../../../core/interfaces/repositorys/chat/i-conversation-repository");
var conversation_service_1 = require("../../../../infrastructure/datasources/chat/conversation.service");
var conversation_repository_1 = require("../../../../data/repositories/chat/conversation.repository");
var i_conversation_datasource_1 = require("../../../../core/interfaces/datasource/chat/i-conversation-datasource");
var message_service_1 = require("../../../../infrastructure/datasources/chat/message.service");
var ClientChatComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-client-chat',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                chat_sidebar_component_1.ChatSidebarComponent,
                chat_messages_component_1.ChatMessagesComponent,
                chat_header_component_1.ChatHeaderComponent,
                chat_input_component_1.ChatInputComponent
            ],
            providers: [
                manage_realtime_message_use_case_1.ManageRealtimeMessageUseCase,
                manage_typing_status_use_case_1.ManageTypingStatusUseCase,
                {
                    provide: i_real_time_comunication_1.IRealTimeComunication,
                    useClass: signal_r_service_1.SignalRService,
                },
                {
                    provide: i_message_repository_1.IMessageRepository,
                    useClass: message_repository_1.MessageRepository,
                },
                contacts_use_case_1.ContactsUseCase,
                {
                    provide: i_user_repository_1.IUserRepository,
                    useClass: user_contact_repository_1.ContactRepository,
                },
                {
                    provide: I_user_datasource_1.IUserDatasource,
                    useClass: contact_service_1.ContactDataSource,
                },
                {
                    provide: i_message_datasource_1.IMessageDatasource,
                    useClass: message_service_1.MessageDataSource,
                },
                conversation_use_case_1.ConversationUseCase,
                {
                    provide: i_conversation_repository_1.IConversationRepository,
                    useClass: conversation_repository_1.ConversationRepository,
                },
                {
                    provide: i_conversation_datasource_1.IConversationDatasource,
                    useClass: conversation_service_1.ConversationService,
                }
            ],
            templateUrl: './client-chat.component.html',
            styleUrls: ['./client-chat.component.css'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ClientChatComponent = _classThis = /** @class */ (function () {
        function ClientChatComponent_1(ContactsUseCase, manageRealTimeMessages, manageTypingStatus, conversationUseCase, storage) {
            this.ContactsUseCase = ContactsUseCase;
            this.manageRealTimeMessages = manageRealTimeMessages;
            this.manageTypingStatus = manageTypingStatus;
            this.conversationUseCase = conversationUseCase;
            this.storage = storage;
            /** Lista de todos los contactos disponibles */
            this.contacts = [];
            /** Almacena todas las conversaciones activas */
            this.conversations = [];
            /** Indica si el contacto está escribiendo actualmente */
            this.isTyping = false;
            /** Subject para manejar la limpieza de subscripciones */
            this.unsubscribe$ = new rxjs_1.Subject();
        }
        /**
         * Inicializa los datos de la pantalla y la comunicación en tiempo real.
         * Se llama cuando el componente se inicializa.
         */
        ClientChatComponent_1.prototype.ngOnInit = function () {
            this.initData();
            this.initRealTimeCommunication();
        };
        /**
         * Destruye la suscripción y cierra la conexión con SignalR cuando el componente se destruye.
         */
        ClientChatComponent_1.prototype.ngOnDestroy = function () {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
            this.manageRealTimeMessages.closeConnection();
        };
        /**
         * Cambia el estado de un contacto y actualiza la conversacion activa.
         * @param contact El contacto seleccionado.
         */
        ClientChatComponent_1.prototype.onContactClick = function (contact) {
            var _this = this;
            this.contacts.forEach(function (c) { return (c.selected = false); });
            contact.selected = true;
            this.contactSelected = contact;
            this.conversations = [];
            this.conversationUseCase.getConversationByParticipants(2, contact.userId)
                .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                .subscribe({
                next: function (conversation) {
                    _this.conversations.push(conversation);
                    console.log('Conversación cargada:', conversation);
                },
                error: function (err) { return console.error('Error obteniendo conversación:', err); }
            });
        };
        /**
         * Notifica al servidor que el usuario esta escribiendo actualmente.
         * @param text El texto ingresado por el usuario.
         */
        ClientChatComponent_1.prototype.onTyping = function (text) {
            if (this.contactSelected && (text === null || text === void 0 ? void 0 : text.length) > 0) {
                this.manageTypingStatus.notifyTyping(2, true);
            }
        };
        /**
         * Inicializa los datos de la pantalla, obteniendo la lista de contactos y una conversacion de ejemplo.
         * Selecciona el primer contacto activo o el primero de la lista si no hay ninguno activo.
         * Se suscribe a los eventos de ContactUseCase y ConversationUseCase para obtener los datos.
         * Se cancelan las subscripciones cuando el componente se destruye.
         */
        ClientChatComponent_1.prototype.initData = function () {
            var _this = this;
            // Obtener contactos
            this.ContactsUseCase.execute()
                .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                .subscribe({
                next: function (contacts) {
                    _this.contacts = contacts;
                    _this.contactSelected = contacts.find(function (c) { return c.isActive; }) || contacts[0];
                },
                error: function (err) { return console.error('Error obteniendo contactos:', err); }
            });
            // Obtener una conversacion
            this.conversationUseCase.getConversationByParticipants(2, this.contactSelected.userId)
                .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                .subscribe({
                next: function (conversation) {
                    _this.conversations.push(conversation);
                    console.log('Conversaciones obtenidas:', conversation);
                },
                error: function (err) { return console.error('Error obteniendo conversaciones:', err); }
            });
        };
        /**
         * Incializa la comunicación en tiempo real,
         * escucha los mensajes y actualiza la conversación local.
         */
        ClientChatComponent_1.prototype.initRealTimeCommunication = function () {
            this.manageRealTimeMessages.initializeConnection();
            this.listenForMessages();
            this.listenForTypingStatus();
        };
        /**
         * Envia un mensaje a través de SignalR y actualiza la conversación local.
         * Si no existe una conversación, crea una nueva y envía el mensaje.
         * @param newMessage El contenido del mensaje a enviar.
         */
        ClientChatComponent_1.prototype.onSendMessage = function (newMessage) {
            var _this = this;
            var selectedContact = this.contactSelected;
            // Verificar si hay un contacto seleccionado
            if (!selectedContact) {
                console.error('No hay contacto seleccionado');
                return;
            }
            // Verificar si existe una conversación
            if (!selectedContact.conversationId) {
                // Crear nueva conversación
                var newConversation = new conversation_entity_1.ConversationEntity({
                    type: conversation_entity_1.ConversationType.INDIVIDUAL,
                    participants: [this.currenUserSesion(), selectedContact],
                    messages: []
                });
                this.conversationUseCase.createConversation(newConversation)
                    .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                    .subscribe({
                    next: function (conversation) {
                        if (conversation && conversation.id) {
                            // Actualizar ID de conversación
                            selectedContact.conversationId = conversation.id;
                            _this.conversations.push(conversation);
                            // Crear y enviar mensaje
                            var message = _this.createMessage(newMessage);
                            message.conversationId = conversation.id;
                            _this.sendMessage(message);
                        }
                    },
                    error: this.handleMessageError.bind(this)
                });
            }
            else {
                // Ya existe conversación, enviar mensaje directamente
                var message = this.createMessage(newMessage);
                message.conversationId = selectedContact.conversationId;
                this.sendMessage(message);
            }
        };
        /**
         * Envía un mensaje a través de SignalR y actualiza la conversación local.
         * @param message El mensaje a enviar.
         */
        ClientChatComponent_1.prototype.sendMessage = function (message) {
            var _this = this;
            if (!message.conversationId) {
                console.error('El mensaje debe tener un ID de conversación');
                return;
            }
            this.manageRealTimeMessages.sendMessage(message)
                .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                .subscribe({
                next: function (conversation) {
                    if (conversation) {
                        _this.handleNewConversation(conversation);
                    }
                },
                complete: function () {
                    _this.handleCompleteSendMessage(message);
                },
                error: this.handleMessageError.bind(this)
            });
        };
        ClientChatComponent_1.prototype.currenUserSesion = function () {
            return new conversation_participant_1.ConversationParticipant({
                userId: 2,
                userName: 'Solano Flores',
                avatar: 'https://example.com/avatar2.jpg'
            });
        };
        /**
         * Se llama cuando se completa el envio del mensaje.
         * Notifica el estado de escritura y transmite el mensaje enviado.
         * @param message El mensaje enviado.
         */
        ClientChatComponent_1.prototype.handleCompleteSendMessage = function (message) {
            this.manageTypingStatus.notifyTyping(2, false);
            this.manageRealTimeMessages.broadcastMessage(message);
        };
        /**
         * Se llama cuando se recibe una conversación nueva desde el SignalR.
         * Verifica si la conversación ya existe en la lista de conversaciones locales.
         * Si no existe, se agrega a la lista de conversaciones. De lo contrario, no se hace nada.
         * @param incomingConversation La conversación recibida desde el SignalR.
         */
        ClientChatComponent_1.prototype.handleNewConversation = function (incomingConversation) {
            var conversationExists = this.conversations.some(function (conv) { var _a, _b; return ((_a = conv === null || conv === void 0 ? void 0 : conv.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = incomingConversation === null || incomingConversation === void 0 ? void 0 : incomingConversation.id) === null || _b === void 0 ? void 0 : _b.toString()); });
            if (!conversationExists) {
                this.conversations.push(incomingConversation);
            }
        };
        /**
         * Maneja el error cuando se produce un error al enviar un mensaje.
         * Limpia el estado de escritura y muestra el error en la consola.
         * @param error El error producido al enviar el mensaje.
         */
        ClientChatComponent_1.prototype.handleMessageError = function (error) {
            console.error('Error enviando mensaje:', error);
            this.manageTypingStatus.notifyTyping(2, false);
        };
        /**
         * Crea un nuevo objeto MessageEntity con el contenido proporcionado.
         * Asigna un remitente utilizando el método createParticipant.
         * El tipo de mensaje es TEXT y se inicializa con un estado de enviado.
         *
         * @param content El contenido del mensaje a enviar.
         * @returns Un objeto MessageEntity representando el mensaje creado.
         */
        ClientChatComponent_1.prototype.createMessage = function (content) {
            var sender = this.currenUserSesion();
            return new message_entity_1.MessageEntity({
                sender: sender,
                content: content,
                type: message_entity_1.MessageType.TEXT,
                status: [new message_status_1.MessageStatus(2, message_status_1.Status.SENT, new Date())],
                createdAt: new Date(),
                isDeleted: false
            });
        };
        /**
         * Escucha los mensajes en tiempo real y actualiza la conversación local.
         * Se cancela la subscripción cuando el componente se destruye.
         */
        ClientChatComponent_1.prototype.listenForMessages = function () {
            var _this = this;
            this.manageRealTimeMessages.listenForMessages()
                .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                .subscribe({
                next: function (incomingMessage) {
                    console.log('Mensaje recibido:', incomingMessage);
                    _this.handleIncomingMessage(incomingMessage);
                },
                error: function (error) { return console.error('Error al recibir mensajes:', error); }
            });
        };
        /**
       * Procesa un mensaje entrante y lo agrega a la conversacion correspondiente.
       *
       * @param incomingMessage El mensaje entrante que se va a procesar.
       */
        ClientChatComponent_1.prototype.handleIncomingMessage = function (incomingMessage) {
            var _this = this;
            // Verificar que el mensaje tenga ID de conversación
            if (!incomingMessage.conversationId) {
                console.error('Mensaje recibido sin ID de conversación');
            }
            var conversation = this.findConversationById(incomingMessage.conversationId);
            if (!conversation) {
                // Si no existe la conversación, obtenerla del servidor
                this.conversationUseCase.getConversationById(incomingMessage.conversationId)
                    .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                    .subscribe({
                    next: function (newConversation) {
                        if (newConversation) {
                            _this.conversations.push(newConversation);
                            newConversation.messages.push(incomingMessage);
                        }
                    },
                    error: function (error) { return console.error('Error al obtener conversación:', error); }
                });
            }
            else {
                conversation.messages.push(incomingMessage);
            }
        };
        /**
         * Encuentra una conversaci n por su ID.
         *
         * @param conversationId El ID de la conversaci n a buscar.
         * @returns La conversaci n con el ID proporcionado, o undefined si no se encuentra.
         */
        ClientChatComponent_1.prototype.findConversationById = function (conversationId) {
            return this.conversations.find(function (conv) { var _a; return ((_a = conv === null || conv === void 0 ? void 0 : conv.id) === null || _a === void 0 ? void 0 : _a.toString()) === (conversationId === null || conversationId === void 0 ? void 0 : conversationId.toString()); });
        };
        /**
         * Escucha el estado de escritura en tiempo real y actualiza el estado de escritura
         * de cada usuario en la lista de conversaciones.
         */
        ClientChatComponent_1.prototype.listenForTypingStatus = function () {
            var _this = this;
            this.manageTypingStatus.listenTypingStatus()
                .pipe((0, rxjs_1.takeUntil)(this.unsubscribe$))
                .subscribe({
                next: function (_a) {
                    var userId = _a.userId, isTyping = _a.isTyping;
                    _this.updateTypingStatus(userId, isTyping);
                },
                error: function (error) { return console.error('Error al recibir el estado de escritura:', error); },
            });
        };
        /**
         * Actualiza el estado de escritura de un usuario en la lista de conversaciones.
         *
         * @param userId El ID del usuario a actualizar.
         * @param isTyping El estado de escritura a asignar.
         */
        ClientChatComponent_1.prototype.updateTypingStatus = function (userId, isTyping) {
            var contact = this.findContactById(userId);
            if (contact) {
                this.isTyping = isTyping;
            }
        };
        /**
         * Busca un contacto en la lista de contactos por su ID.
         *
         * @param userId El ID del contacto a buscar.
         * @returns El contacto con el ID proporcionado, o undefined si no se encuentra.
         */
        ClientChatComponent_1.prototype.findContactById = function (userId) {
            return this.contacts.find(function (contact) { var _a; return ((_a = contact.userId) === null || _a === void 0 ? void 0 : _a.toString().trim()) === (userId === null || userId === void 0 ? void 0 : userId.toString().trim()); });
        };
        /**
         * Obtiene los mensajes asociados al contacto seleccionado.
         * @returns El array de mensajes asociados al contacto seleccionado.
         */
        ClientChatComponent_1.prototype.getMessages = function () {
            var _this = this;
            var conversation = this.conversations.find(function (conv) { var _a, _b, _c; return ((_a = conv.id) === null || _a === void 0 ? void 0 : _a.toString().trim()) === ((_c = (_b = _this.contactSelected) === null || _b === void 0 ? void 0 : _b.conversationId) === null || _c === void 0 ? void 0 : _c.toString().trim()); });
            return (conversation === null || conversation === void 0 ? void 0 : conversation.messages) || [];
        };
        return ClientChatComponent_1;
    }());
    __setFunctionName(_classThis, "ClientChatComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ClientChatComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ClientChatComponent = _classThis;
}();
exports.ClientChatComponent = ClientChatComponent;
