import request from 'supertest';
import App from '../src/app';

describe('App', () => {
  it('should handle errors with status 404', async () => {
    const app = new App();
    const response = await request(app.app).get('/error');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });

  it('should respond with JSON for /api/users', async () => {
    const app = new App();
    const response = await request(app.app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

});
