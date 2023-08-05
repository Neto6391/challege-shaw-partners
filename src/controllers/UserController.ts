import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const userService = new UserService();
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error:any) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getUserDetails(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const userService = new UserService();
      const user = await userService.getUserDetails(username);
      res.json(user);
    } catch (error:any) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Outros métodos do controller aqui
}

export default UserController;
