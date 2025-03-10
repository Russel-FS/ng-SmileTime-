import { MessageStatus, Status } from '../message-status';

export const mockMessageStatus = new MessageStatus(1, Status.SENT, new Date());

export const mockMessageStatuses = [
  mockMessageStatus,
  new MessageStatus(2, Status.DELIVERED, new Date()),
  new MessageStatus(3, Status.READ, new Date()),
];
