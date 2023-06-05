const request = require('supertest');
const app = require('../app');

describe('Starting Server', () => {
  it('Status 200', async () => {
    const res = await request(app)
    .get('/')
    expect(res.statusCode).toEqual(200)
  });
  it('Should return Finish server', async () => {
    const res = await request(app)
    .get('/')
    expect(res.body.message).toEqual('Finish server')
  })
});

describe('Route /register', () => {
  let registeredUserId;
  // it('Should Register 200', async () => {
  //   const userData = {
  //     first_name: 'John',
  //     last_name: 'Smith',
  //     email: 'john@smith.com',
  //     password: 'password',
  //     phone: '123456'
  //   };

  //   const res = await request(app)
  //     .post('/register')
  //     .send(userData);

  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty('user');

  //   registeredUserId = res.body.user.id;
  // }) 
  it('Should Already Register 409', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@smith.com',
      password: 'password',
      phone: '123456'
    };

    const res = await request(app)
      .post('/register')
      .send(userData);

    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toBe("User already exists. Please Login");
  })
});

afterAll(async () => {
  // if(registeredUserId) {
  //   await deleteRegisteredUser(registeredUserId);
  // }
  console.log('cleaning')
})
