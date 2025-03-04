export interface ContactMessage {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  lastMessage: string;
  unread: number;
  isActive?: boolean;
}
