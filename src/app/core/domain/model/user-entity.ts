export class UserEntity {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public avatar: string,
    public role: string,
    public lastActive?: Date,
    public isActive: boolean = true,
    public createdAt: Date = new Date(),
  ) {}

  isOnline(): boolean {
    if (!this.lastActive) return false;
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
    return this.lastActive > fiveMinutesAgo;
  }
}
