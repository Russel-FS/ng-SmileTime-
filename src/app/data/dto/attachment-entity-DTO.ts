export interface AttachmentEntityDTO {
  attachmentId?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  fileSize: number;
  uploadedAt: Date;
  messageId?: string | number;
}
