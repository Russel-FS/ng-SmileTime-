export class Message {
  id?: number;
  text: string;
  isUser: boolean;
  timestamp: Date;

  constructor(text: string, isUser: boolean, timestamp: Date, id?: number) {
    this.text = text;
    this.isUser = isUser;
    this.timestamp = timestamp;
    this.id = id;
  }
}
