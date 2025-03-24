"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMessageStatuses = exports.mockMessageStatus = void 0;
var message_status_1 = require("../message-status");
exports.mockMessageStatus = new message_status_1.MessageStatus(1, message_status_1.Status.SENT, new Date());
exports.mockMessageStatuses = [
    exports.mockMessageStatus,
    new message_status_1.MessageStatus(2, message_status_1.Status.DELIVERED, new Date()),
    new message_status_1.MessageStatus(3, message_status_1.Status.READ, new Date()),
];
