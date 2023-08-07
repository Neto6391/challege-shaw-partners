class User {
  id: number;
  login: string;
  profileUrl: string;



  constructor(data: any) {
    this.id = data.id;
    this.login = data.login;
    this.profileUrl = data.avatar_url;
  }
}

export default User;
