import { Request, Response } from 'express';
import UserController from '../../src/controllers/UserController';
import UserService from '../../src/services/UserService';
import User from '../../src/models/User';
import Repository from '../../src/models/Repository';

describe('UserController', () => {
  let mockedUserService: jest.Mocked<UserService>;
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockedUserService = {
      getAllUsers: jest.fn(),
      getUserDetails: jest.fn(),
      getUserRepositories: jest.fn(),
    } as jest.Mocked<UserService>;

    userController = new UserController();
    (userController as any).userService = mockedUserService;

    req = { params: { username: 'john_doe' }, query: { since: '1' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const mockedUsers: User[] = [
        new User({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          login: 'johndoe',
          profileUrl: 'https://example.com/johndoe',
          createdAt: new Date('2023-08-05T23:56:00.124Z'),
        }),
      ];

      mockedUserService.getAllUsers.mockResolvedValue(mockedUsers);

      await userController.getAllUsers(req as Request, res as Response);

      expect(mockedUserService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedUsers);
    });
  });

  describe('getUserDetails', () => {
    it('should get user details', async () => {
      const mockedUser = new User({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        login: 'johndoe',
        profileUrl: 'https://example.com/johndoe',
        createdAt: new Date('2023-08-05T23:56:00.124Z'),
      });

      mockedUserService.getUserDetails.mockResolvedValue(mockedUser);

      await userController.getUserDetails(req as Request, res as Response);

      expect(mockedUserService.getUserDetails).toHaveBeenCalledWith('john_doe');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedUser);
    });
  });

  describe('getUserRepositories', () => {
    it('should get user repositories', async () => {
      const mockedRepos: Repository[] = [
        new Repository({ id: 1, name: 'john_doe', url: 'desc' }),
      ];

      mockedUserService.getUserRepositories.mockResolvedValue(mockedRepos);

      await userController.getUserRepositories(req as Request, res as Response);

      expect(mockedUserService.getUserRepositories).toHaveBeenCalledWith('john_doe');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedRepos);
    });
  });
});
