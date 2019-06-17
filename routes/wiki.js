const path = require('path')
const chokidar = require('chokidar')
const logger = require('../logger')

const directoryTree = require('directory-tree')

module.exports = express => {
  const router = express.Router()
  const location = path.join('wiki')
  let tree = directoryTree(location, {
    normalizePath: true
  })
  logger.debug(tree)

  chokidar.watch(location).on('all', (event, path) => {
    tree = directoryTree(location, {
      normalizePath: true
    })
  })

  router.get('/', (req, res) => {
//    res.append('Access-Control-Allow-Origin', '*')
    return res.sendFile(path.join(__dirname, '..', 'README.md'))
  })

  router.get('/routes', (req, res) => {
  //  res.append('Access-Control-Allow-Origin', '*')
    return res.json(tree)
  })

  router.get('/reload', (req, res) => {
//    res.append('Access-Control-Allow-Origin', '*')
    return res.json(tree)
  })

  return router
}
