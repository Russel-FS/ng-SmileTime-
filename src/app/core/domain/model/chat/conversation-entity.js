"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationEntity = exports.ConversationType = void 0;
var ConversationType;
(function (ConversationType) {
    ConversationType["INDIVIDUAL"] = "individual";
    ConversationType["GROUP"] = "group";
})(ConversationType || (exports.ConversationType = ConversationType = {}));
var ConversationEntity = /** @class */ (function () {
    function ConversationEntity(params) {
        var _a;
        this.id = params.id || '';
        this.title = params.title || '';
        this.type = params.type || ConversationType.INDIVIDUAL;
        this.participants = params.participants;
        this.messages = params.messages || [];
        this.createdAt = params.createdAt || new Date();
        this.updatedAt = params.updatedAt;
        this.isActive = (_a = params.isActive) !== null && _a !== void 0 ? _a : true;
    }
    ConversationEntity.prototype.addParticipant = function (participant) {
        this.participants.push(participant);
    };
    ConversationEntity.prototype.removeParticipant = function (userId) {
        var index = this.participants.findIndex(function (p) { return p.userId === userId; });
        if (index !== -1) {
            this.participants[index].leftAt = new Date();
        }
    };
    ConversationEntity.prototype.addMessage = function (message) {
        this.messages.push(message);
        this.updatedAt = new Date();
    };
    ConversationEntity.prototype.getLastMessage = function () {
        return this.messages[this.messages.length - 1];
    };
    return ConversationEntity;
}());
exports.ConversationEntity = ConversationEntity;
