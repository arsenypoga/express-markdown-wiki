/**
 * global external imports
 */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

/**
 * File imports
 */
const logger = require('./logger')
const wiki = require('./routes').wiki

const app = express()

/**
 * Set port
 */
const PORT = process.env.PORT || 3000
app.set('port', PORT)

app.use(cors())
app.use(
  morgan('short', {
    stream: logger.stream
  })
)

app.use('/wiki', express.static('wiki'))

/* istanbul ignore else */
if (app.get('env') === 'development' || app.get('env') === 'test') {
  logger.warn('Coverage enabled')
  app.use('/coverage', express.static('coverage/lcov-report'))
}

/**
 * Routes
 */

app.use('/api/wiki', wiki)

app.get('/', (req, res) => {
  return res.json({ message: 'success' })
})
module.exports = app
