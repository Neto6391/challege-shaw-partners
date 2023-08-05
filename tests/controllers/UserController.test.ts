import { Request, Response } from 'express';
import UserController from '../../src/controllers/UserController';
import UserService from '../../src/services/UserService';
import User from '../../src/models/User';

jest.mock('../../src/services/UserService');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with JSON for /api/users', async () => {
    // Mock dos dados do usuário retornado pelo serviço
    const mockedUsers: User[] = [
      new User({
        id: 1,
        login: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        html_url: 'https://github.com/john_doe',
        created_at: '2021-01-01T12:00:00Z',
      }),
      new User({
        id: 2,
        login: 'jane_smith',
        name: 'Jane Smith',
        email: 'jane@example.com',
        html_url: 'https://github.com/jane_smith',
        created_at: '2021-02-01T12:00:00Z',
      }),
    ];
    (UserService.prototype.getAllUsers as jest.Mock).mockResolvedValue(mockedUsers);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const userController = new UserController();
    await userController.getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockedUsers);
  });

  // ... outros testes para os demais métodos do controller
});
