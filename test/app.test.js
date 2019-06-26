const app = require('../app')
const supertest = require('supertest')
const client = supertest(app)

describe('app', () => {
  test('/', () => {
    return client.get('/').then(res => {
      expect(res.statusCode).toBe(200)
    })
  })

  test('should respond successfully to GET `/coverage` with development and test enviroment', () => {
    expect(app.get('env')).toBe('test')

    app.set('env', 'development')
    expect(app.get('env')).toBe('development')

    return supertest(app)
      .get('/coverage/index.html')
      .then(res => expect(res.statusCode).toBe(200))
  })
})
