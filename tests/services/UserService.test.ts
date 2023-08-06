import axios from 'axios';
import UserService from '../../src/services/UserService';
import User from '../../src/models/User';
import Repository from '../../src/models/Repository';

jest.mock('axios');

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const since = 0;
    const mockedUsersData = [
      { id: 1, login: 'user1' },
      { id: 2, login: 'user2' },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockedUsersData });

    const users = await userService.getAllUsers(since);

    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users`, { params: { since } });
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
  });

  it('should return user details', async () => {
    const username = 'john_doe';
    const mockedUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockedUser });

    const userService = new UserService();
    const user = await userService.getUserDetails(username);

    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}`);
    expect(user).toBeInstanceOf(User);
  });

  it('should return user repositories', async () => {
    const username = 'john_doe';
    const mockedRepos = [
      { id: 1, name: 'repo1', url: 'https://github.com/john_doe/repo1' },
      { id: 2, name: 'repo2', url: 'https://github.com/john_doe/repo2' },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockedRepos });

    const userService = new UserService();
    const repositories = await userService.getUserRepositories(username);

    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}/repos`);
    expect(repositories).toHaveLength(2);
    expect(repositories[0]).toBeInstanceOf(Repository);
  });

  it('should throw an error when getAllUsers request fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch users from GitHub API'));

    const userService = new UserService();

    await expect(userService.getAllUsers(0)).rejects.toThrowError('Failed to fetch users from GitHub API');
  });

  it('should throw an error when getUserDetails request fails', async () => {
    const username = 'john_doe';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(`Failed to fetch user '${username}' from GitHub API`));

    const userService = new UserService();

    await expect(userService.getUserDetails(username)).rejects.toThrowError(
      `Failed to fetch user '${username}' from GitHub API`
    );
  });

  it('should throw an error when getUserRepositories request fails', async () => {
    const username = 'john_doe';
    (axios.get as jest.Mock).mockRejectedValueOnce(
      new Error(`Failed to fetch repositories of user '${username}' from GitHub API`)
    );

    const userService = new UserService();

    await expect(userService.getUserRepositories(username)).rejects.toThrowError(
      `Failed to fetch repositories of user '${username}' from GitHub API`
    );
  });
});
