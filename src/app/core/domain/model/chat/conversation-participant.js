"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationParticipant = void 0;
var ConversationParticipant = /** @class */ (function () {
    function ConversationParticipant(params) {
        this.userId = params.userId;
        this.userName = params.userName;
        this.avatar = params.avatar;
        this.lastActive = params.lastActive;
        this.joinedAt = params.joinedAt;
        this.leftAt = params.leftAt;
        this.selected = params.selected;
        this.role = params.role;
        this.isOnline = params.isOnline;
        this.isTyping = params.isTyping;
        this.conversationId = params.conversationId;
    }
    ConversationParticipant.prototype.isActive = function () {
        return this.isOnline || false;
    };
    ConversationParticipant.prototype.isSelected = function () {
        return this.selected || false;
    };
    return ConversationParticipant;
}());
exports.ConversationParticipant = ConversationParticipant;
