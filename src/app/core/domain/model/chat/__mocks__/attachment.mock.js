"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAttachments = exports.mockAttachment = void 0;
var attachment_entity_1 = require("../attachment-entity");
exports.mockAttachment = new attachment_entity_1.AttachmentEntity('1', 'http://example.com/file.pdf', 'file.pdf', 'application/pdf', 1024, new Date());
exports.mockAttachments = [
    exports.mockAttachment,
    new attachment_entity_1.AttachmentEntity('2', 'http://example.com/image.jpg', 'image.jpg', 'image/jpeg', 2048, new Date())
];
