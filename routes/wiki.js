const path = require('path')
const fs = require('fs')

module.exports = express => {
  const router = express.Router()

  const walkDir = dir => {
    const files = fs.readdirSync(dir)
    logger.debug(files)
  }

  const walkDir = dir => {
    const files = []
    const directories = []
    fs.readdir(dir, (err, files) => {
      files.forEach((file) => {
        if (fs.stat(path.join(dir, file), (err, stat) => {
          
        }))
      })
    })
  }

  walkDir('./wiki')

  router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'README.md'))
  })

  router.get('/routes', (req, res) => {
    return res
  })

  return router
}
