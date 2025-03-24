"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentEntity = void 0;
var AttachmentEntity = /** @class */ (function () {
    function AttachmentEntity(id, fileUrl, fileName, fileType, fileSize, uploadedAt) {
        this.id = id;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.uploadedAt = uploadedAt;
    }
    AttachmentEntity.prototype.getFileExtension = function () {
        return this.fileName.split('.').pop() || '';
    };
    AttachmentEntity.prototype.isImage = function () {
        return ['jpg', 'jpeg', 'png', 'gif'].includes(this.getFileExtension().toLowerCase());
    };
    return AttachmentEntity;
}());
exports.AttachmentEntity = AttachmentEntity;
