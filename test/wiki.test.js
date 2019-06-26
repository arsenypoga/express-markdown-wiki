const app = require('../app')
const supertest = require('supertest')

const client = supertest(app)

describe('/api/wiki', () => {
  test('should send full list of routes', () => {
    return client
      .get('/api/wiki/routes')
      .then(res => expect(res.statusCode).toBe(200))
  })
})
