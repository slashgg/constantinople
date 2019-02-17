export class User {
  public email: string;
  public username: string;
  public roles: string[];

  constructor(obj: Partial<User>) {
    this.email = obj.email || null;
    this.username = obj.username || null;
    this.roles = obj.roles && Array.isArray(obj.roles) ? obj.roles : [obj.roles as any] || [];
  }

  public isStaff() {
    return this.roles.some(r => r === 'Staff');
  }
}
