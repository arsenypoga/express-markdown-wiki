/**
 * global external imports
 */
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

app.use(cors())
app.use(
  morgan('short', {
    stream: logger.stream
  })
)

app.use('/wiki', express.static('wiki'))

/**
 * Routes
 */

app.use('/api/wiki', wiki)

app.get('/', (req, res) => {
  return res.json({ message: 'success' })
})

app.listen(PORT, () => {
  logger.info(`Server ${manifest.name} listening on : ${PORT}`)
})
