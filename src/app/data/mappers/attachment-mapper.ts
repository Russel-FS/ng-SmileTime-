import { Injectable } from '@angular/core';
import { AttachmentEntity } from '../../core/domain/model/chat/attachment-entity';
import { AttachmentEntityDTO } from '../dto/attachment-entity-DTO';

@Injectable({
  providedIn: 'root',
})
export class AttachmentMapper {
  toModel(dto: AttachmentEntityDTO): AttachmentEntity {
    return new AttachmentEntity(
      dto.id,
      dto.messageId,
      dto.fileUrl,
      dto.fileName,
      dto.fileType,
      dto.fileSize,
      dto.uploadedAt,
    );
  }

  toDTO(model: AttachmentEntity): AttachmentEntityDTO {
    return {
      id: model.id,
      messageId: model.messageId,
      fileUrl: model.fileUrl,
      fileName: model.fileName,
      fileType: model.fileType,
      fileSize: model.fileSize,
      uploadedAt: model.uploadedAt,
    };
  }
}
