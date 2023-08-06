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
    this.profileUrl = data.html_url;
    this.createdAt = new Date(data.created_at);
  }
}

export default User;
