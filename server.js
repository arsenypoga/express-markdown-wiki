/**
 * global external imports
 */
const express = require('express')
const morgan = require('morgan')

/**
 * File imports
 */
const manifest = require('./package.json')
const logger = require('./logger')
const wiki = require('./routes').wiki(express)

const app = express()

/**
 * Set port
 */
const PORT = process.env.PORT || 3000
app.set('port', PORT)

app.use(morgan('common', {
  stream: logger.stream
}))

app.use('/wiki', express.static('wiki'))

app.use('*', (req, res, next) => {
  logger.info('Using CORS Handling')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/**
 * Routes
 */
app.use('/api/wiki', wiki)

app.listen(PORT, () => {
  logger.info(`Server ${manifest.name} listening on : ${PORT}`)
})
