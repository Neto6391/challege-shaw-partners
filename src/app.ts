import express, { Request, Response, NextFunction } from 'express';
import UserController from './controllers/UserController';
import cors from 'cors';

require('dotenv').config()

class App {
  public app: express.Application;
  userController: UserController = new UserController();

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.app.get('/api/users', this.userController.getAllUsers.bind(this.userController));
    this.app.get('/api/users/:username/details', this.userController.getUserDetails.bind(this.userController));
    this.app.get('/api/users/:username/repos', this.userController.getUserRepositories.bind(this.userController));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ error: 'Not Found' });
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  }
}

export default App;

