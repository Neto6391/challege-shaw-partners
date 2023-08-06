import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const since = req.query.since as string;
      const sinceNumber = Number(since);
      let users = await this.userService.getAllUsers(sinceNumber);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      users = users.slice(startIndex, endIndex);

      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getUserDetails(req: Request, res: Response) {
    try {
      const username = req.params.username;
      const user = await this.userService.getUserDetails(username);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getUserRepositories(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const username = req.params.username;
      let repositories = await this.userService.getUserRepositories(username);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      repositories = repositories.slice(startIndex, endIndex);

      res.status(200).json(repositories);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
