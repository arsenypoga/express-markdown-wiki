/**
 * global external imports
 */
const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
/**
 * Standard lib imports
 */
const path = require('path')
const fs = require('fs')

/**
 * File imports
 */
const manifest = require('./package.json')
const wiki = require('./routes').wiki(express)

const app = express()

/**
 * Set port
 */
const PORT = process.env.PORT || 3000
app.set('port', PORT)

/**
 * Set logger
 */
const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json()
})

logger.stream = {
  write: (message, encoding) => logger.info(message)
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  )
}

app.use(morgan('common', { stream: logger.stream }))

/**
 * Routes
 */
app.use('/wiki', wiki)

app.use('*', (req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*')
  next()
})

app.listen(PORT, () => {
  logger.info(`Server ${manifest.name} listening on : ${PORT}`)
})
