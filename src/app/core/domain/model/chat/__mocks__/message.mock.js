"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMessage = void 0;
var message_entity_1 = require("../message-entity");
var attachment_mock_1 = require("./attachment.mock");
var conversation_participant_mock_1 = require("./conversation-participant.mock");
var message_status_mock_1 = require("./message-status.mock");
exports.mockMessage = new message_entity_1.MessageEntity({
    id: '1',
    sender: conversation_participant_mock_1.mockParticipant,
    content: 'hola',
    type: message_entity_1.MessageType.TEXT,
    status: [message_status_mock_1.mockMessageStatus],
    createdAt: new Date(),
    modifiedAt: new Date(),
    attachments: attachment_mock_1.mockAttachments,
    isDeleted: false,
    conversationId: '1',
});
