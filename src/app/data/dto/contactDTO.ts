export interface ContactDTO {
  id: number;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  isTyping: boolean;
  lastMessage: string;
  unread: number;
  isSelected?: boolean;
}
