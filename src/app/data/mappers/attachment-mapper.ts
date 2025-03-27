import { Injectable } from '@angular/core';
import { AttachmentEntity } from '../../core/domain/entities/chat/attachment-entity';
import { AttachmentEntityDTO } from '../dto/attachment-entity-DTO';

@Injectable({
  providedIn: 'root',
})
export class AttachmentMapper {


  toModel(dto: AttachmentEntityDTO): AttachmentEntity {
    return new AttachmentEntity(
      dto.attachmentId as any,
      dto.fileUrl as any,
      dto.fileName as any,
      dto.fileType as any,
      dto.fileSize,
      dto.uploadedAt,
    );
  }

  toDTO(model: AttachmentEntity): AttachmentEntityDTO {
    return {
      attachmentId: model.id,
      fileUrl: model.fileUrl,
      fileName: model.fileName,
      fileType: model.fileType,
      fileSize: model.fileSize,
      uploadedAt: model.uploadedAt,
    };
  }
}
