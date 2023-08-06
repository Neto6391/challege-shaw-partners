import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const since = req.query.since as string;
      const sinceNumber = Number(since);
      const users = await this.userService.getAllUsers(sinceNumber);
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
      const username = req.params.username;
      const repositories = await this.userService.getUserRepositories(username);
      res.status(200).json(repositories);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
