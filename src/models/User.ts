class User {
  id: number;
  login: string;
  avatarUrl: string;
  reposUrl: string;
  followersUrl: string;
  followingUrl: string;
  url: string;


  constructor(data: any) {
    this.id = data.id;
    this.login = data.login;
    this.avatarUrl = data.avatar_url;
    this.reposUrl = data.repos_url;
    this.followersUrl = data.followers_url;
    this.followingUrl = data.following_url
    this.url = data.url
  }
}

export default User;
