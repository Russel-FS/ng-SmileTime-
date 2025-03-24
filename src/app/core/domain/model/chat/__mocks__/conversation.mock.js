"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockConversation = void 0;
var conversation_entity_1 = require("../conversation-entity");
var conversation_participant_mock_1 = require("./conversation-participant.mock");
var message_mock_1 = require("./message.mock");
exports.mockConversation = new conversation_entity_1.ConversationEntity({
    id: '1',
    title: 'Test Conversation',
    type: conversation_entity_1.ConversationType.INDIVIDUAL,
    participants: conversation_participant_mock_1.mockParticipants,
    messages: [message_mock_1.mockMessage],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
});
