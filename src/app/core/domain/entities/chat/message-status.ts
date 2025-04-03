export enum Status {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  PENDING = 'pending',
  FAILED = 'failed'
}
export class MessageStatus {
  constructor(
    public userId: string | number,
    public status: Status,
    public statusTimestamp: Date,
  ) { }
}
