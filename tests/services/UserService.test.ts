import axios from 'axios';
import UserService from '../../src/services/UserService';
import User from '../../src/models/User';

jest.mock('axios');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockedUsers = [
      {
        id: 1,
        login: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        html_url: 'https://github.com/john_doe',
        created_at: '2021-01-01T12:00:00Z',
      },
      {
        id: 2,
        login: 'jane_smith',
        name: 'Jane Smith',
        email: 'jane@example.com',
        html_url: 'https://github.com/jane_smith',
        created_at: '2021-02-01T12:00:00Z',
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedUsers });

    const userService = new UserService();
    const users = await userService.getAllUsers();

    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0].id).toBe(mockedUsers[0].id);
    expect(users[0].login).toBe(mockedUsers[0].login);
    expect(users[0].name).toBe(mockedUsers[0].name);
    expect(users[0].email).toBe(mockedUsers[0].email);
    expect(users[0].profileUrl).toBe(mockedUsers[0].html_url);
    expect(users[0].createdAt).toBe(mockedUsers[0].created_at);
    expect(users[1]).toBeInstanceOf(User);
    expect(users[1].id).toBe(mockedUsers[1].id);
    expect(users[1].login).toBe(mockedUsers[1].login);
    expect(users[1].name).toBe(mockedUsers[1].name);
    expect(users[1].email).toBe(mockedUsers[1].email);
    expect(users[1].profileUrl).toBe(mockedUsers[1].html_url);
    expect(users[1].createdAt).toBe(mockedUsers[1].created_at);
  });

});
