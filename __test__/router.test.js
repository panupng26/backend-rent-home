const request = require('supertest');
const app = require('../app');
describe('my asynchronous test', () => {
    test('should log a message after a 1 second delay', () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('asynchronous operation complete');
          resolve();
        }, 3000);
      });
    });
  });

describe('Report Router Test', () => {
  it('Should create a report with 201 status code', async () => {
    //   expect.assertions(2); // Expect 2 assertions to be executed
  
      const res = await request(app)
        .post('/report/1')
        .send({
          user_id: 1,
          description: 'Test Report'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('report.report_id');
  });

  it('Should return 400 if id is not a number', async () => {
    const res = await request(app)
      .post('/report/invalid-id')
      .send({
        user_id: 1,
        description: 'Test Report'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
