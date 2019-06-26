const app = require('./app')
const logger = require('./logger')

const manifest = require('./package.json')

app.listen(app.get('port'), () => {
  logger.info(`Server ${manifest.name} listening on : ${app.get('port')}`)
})
