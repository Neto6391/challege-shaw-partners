class User {
  public id: number;
  public login: string;
  public name: string;
  public email: string;
  public profileUrl: string;
  public createdAt: string;

  constructor(userData: any) {
    this.id = userData.id;
    this.login = userData.login;
    this.name = userData.name || userData.login;
    this.email = userData.email || '';
    this.profileUrl = userData.html_url || '';
    this.createdAt = userData.created_at || '';
  }
}

export default User;
