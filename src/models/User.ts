class User {
  id: number;
  name: string;
  email: string;
  login: string;
  profileUrl: string;
  createdAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.login = data.login;
    this.profileUrl = data.profileUrl;
    this.createdAt = this.formatDate(data.createdAt);
  }

  private formatDate(date: string | Date): Date {
    const dateObject = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObject.getTime())) {
      throw new Error('Invalid date');
    }

    return dateObject;
  }

  public toResponseObject(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      login: this.login,
      profileUrl: this.profileUrl,
      createdAt: this.createdAt,
    };
  }
}

export default User;
