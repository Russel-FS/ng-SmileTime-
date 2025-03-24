"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockParticipants = exports.mockParticipant = void 0;
var conversation_participant_1 = require("../conversation-participant");
exports.mockParticipant = new conversation_participant_1.ConversationParticipant({
    userId: 1,
    userName: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    lastActive: new Date(),
    joinedAt: new Date(),
});
exports.mockParticipants = [
    exports.mockParticipant,
    new conversation_participant_1.ConversationParticipant({
        userId: 2,
        userName: 'Russel flores',
        avatar: 'https://example.com/avatar2.jpg',
        lastActive: new Date(),
        joinedAt: new Date(),
        isOnline: true,
    }),
];
