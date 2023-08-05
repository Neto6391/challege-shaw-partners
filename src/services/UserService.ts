import axios from 'axios';
import User from '../models/User';

class UserService {
  public async getAllUsers(since?: number): Promise<User[]> {
    try {
      const response = await axios.get(`https://api.github.com/users`, {
        params: { since },
      });

      return response.data.map((userData: any) => new User(userData));
    } catch (error: any) {
      console.error('Error:', error.message);
      throw new Error('Failed to fetch users from GitHub API.');
    }
  }

  public async getUserDetails(username: string): Promise<User> {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return new User(response.data);
    } catch (error: any) {
      console.error('Error:', error.message);
      throw new Error(`Failed to fetch details for user: ${username}`);
    }
  }

}

export default UserService;
