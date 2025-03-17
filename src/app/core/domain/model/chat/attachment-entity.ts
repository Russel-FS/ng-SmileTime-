export class AttachmentEntity {
  constructor(
    public id: string,
    public fileUrl: string,
    public fileName: string,
    public fileType: string,
    public fileSize: number,
    public uploadedAt: Date,
  ) {}

  getFileExtension(): string {
    return this.fileName.split('.').pop() || '';
  }

  isImage(): boolean {
    return ['jpg', 'jpeg', 'png', 'gif'].includes(this.getFileExtension().toLowerCase());
  }
}
