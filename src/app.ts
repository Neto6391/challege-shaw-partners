import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.handleUnknownRoutes();
    this.handleError();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/api', userRoutes);
  }

  private handleUnknownRoutes() {
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({ error: 'Not Found' });
    });
  }

  private handleError() {
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      console.error('Error:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default App;
