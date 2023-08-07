import request from 'supertest';
import App from '../src/app';
import UserService from '../src/services/UserService';
import UserController from '../src/controllers/UserController';

import axios from 'axios';

jest.mock('axios');

describe('App', () => {
  it('should handle errors with status 404', async () => {
    const app = new App();
    const response = await request(app.app).get('/error');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });

  describe('GET /api/users', () => {
    it('should respond with JSON for /api/users', async () => {
      const mockedUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          login: 'johndoe',
          profileUrl: 'https://example.com/johndoe',
          createdAt: new Date(),
        },

      ];

      (axios.get as jest.Mock).mockResolvedValue({ data: mockedUsers });
  
      const mockedResponse = mockedUsers.map((user) => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
      }));
  
      const userController = new UserController();
  
      const res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown) as Response;
  
      jest.spyOn(userController, 'getAllUsers').mockImplementation(async (req, res) => {
        const since = req.query.since ? Number(req.query.since) : undefined;
        const userService = new UserService()
        const users = await userService.getAllUsers(since!);
        return res.status(200).json({
          rows: users,
          actual_page: 1,
          total_pages: 1,
        });
      });
  
      const app = new App();
  
      app.userController = userController;
  
      const response = await request(app.app).get('/api/users').query({ since: '123' });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        rows: mockedResponse,
        actual_page: 1,
        total_pages: 1,
      });
    });
  });
});
