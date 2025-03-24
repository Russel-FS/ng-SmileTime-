"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["FILE"] = "file";
    MessageType["SYSTEM"] = "system";
})(MessageType || (exports.MessageType = MessageType = {}));
var MessageEntity = /** @class */ (function () {
    function MessageEntity(params) {
        this.id = params.id;
        this.sender = params.sender;
        this.content = params.content;
        this.type = params.type || MessageType.TEXT;
        this.status = params.status || [];
        this.createdAt = params.createdAt || new Date();
        this.modifiedAt = params.modifiedAt || null;
        this.attachments = params.attachments || [];
        this.isDeleted = params.isDeleted || false;
        this.conversationId = params.conversationId;
    }
    return MessageEntity;
}());
exports.MessageEntity = MessageEntity;
