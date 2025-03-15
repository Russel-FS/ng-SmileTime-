import { AttachmentEntity } from '../attachment-entity';

export const mockAttachment = new AttachmentEntity(
  '1',
  'http://example.com/file.pdf',
  'file.pdf',
  'application/pdf',
  1024,
  new Date()
);

export const mockAttachments = [
  mockAttachment,
  new AttachmentEntity(
    '2',
    'http://example.com/image.jpg',
    'image.jpg',
    'image/jpeg',
    2048,
    new Date()
  )
];
