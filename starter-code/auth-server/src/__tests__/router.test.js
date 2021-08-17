'use strict';

const supertest = require('supertest');
const server = require('../server');
const { db } = require('../auth/models/index');
const mockRequest = supertest(server.server);
let users = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
  writer: { username: 'writer', password: 'password' }
};

describe('Router', () => {
  Object.keys(users).forEach(userType => {
    describe(`${userType} users`, () => {
      it('create one', async (done) => {
        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;
        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });
      it('signin with basic', async (done) => {
        const response = await mockRequest.post('/signin')
        .auth(users[userType].username, users[userType].password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });
      it('signin with bearer', async (done) => {
        const response = await mockRequest.post('/signin')
        .auth(users[userType].username, users[userType].password);
        const token = response.body.token;
        const bearerResponse = await mockRequest
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        expect(bearerResponse.status).toBe(200);
        done();
      });
    });
    describe('bad logins', async () => {
      it('basic fails  known user , wrong password ', async (done) => {
        const response = await mockRequest.post('/signin')
        .auth('admin', 'xyz')
        const userObject = response.body;
        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
        done();
      });
      it('basic fails unknown user', async (done) => {
        const response = await mockRequest.post('/signin')
        .auth('nobody', 'xyz')
        const userObject = response.body;
        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()
        done();
      });
      it('bearer fails invalid token', async (done) => {
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer foobar`)
          expect(bearerResponse.status).toBe(403);
          done();
      })
    })

  });

});
