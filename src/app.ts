import express, { Request, Response, NextFunction } from 'express';
import UserController from './controllers/UserController';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    const userController = new UserController();

    this.app.get('/api/users', userController.getAllUsers.bind(userController));
    this.app.get('/api/users/:username/details', userController.getUserDetails.bind(userController));
    this.app.get('/api/users/:username/repos', userController.getUserRepositories.bind(userController));

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