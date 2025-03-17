export interface UserEntityDto {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: string;
  lastActive?: Date;
  isActive: boolean;
  createdAt: Date;
}
