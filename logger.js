const winston = require('winston')

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

module.exports = logger
