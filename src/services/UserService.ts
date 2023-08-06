import axios from 'axios';
import User from '../models/User';
import Repository from '../models/Repository';

const GITHUB_API_URL = 'https://api.github.com';

class UserService {
  public async getAllUsers(since: number): Promise<User[]> {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/users`, {
        params: { since },
      });
      return response.data.map((userData: any) => new User(userData));
    } catch (error) {
      throw new Error('Failed to fetch users from GitHub API');
    }
  }

  public async getUserDetails(username: string): Promise<User> {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
      return new User(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch user '${username}' from GitHub API`);
    }
  }

  public async getUserRepositories(username: string): Promise<Repository[]> {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`);
      return response.data.map((repositoryData: any) => new Repository(repositoryData));
    } catch (error) {
      throw new Error(`Failed to fetch repositories of user '${username}' from GitHub API`);
    }
  }
}

export default UserService;
