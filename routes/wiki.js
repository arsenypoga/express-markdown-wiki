const path = require('path')
const logger = require('../logger')
const router = require('express').Router()

const directoryTree = require('directory-tree')

const rootLocation = path.join('wiki')

/**
 * Generates JSON directory tree
 *
 * @param {string} location - directory location
 * @return {Object} directory tree JSON Object
 */
const getTree = location => {
  logger.debug(`Generating File Tree for location: ${location}`)

  return directoryTree(location, {
    normalizePath: true,
    extensions: /\.(md)$/,
    exclude: /notes\/cheatsheets\/_*/
  })
}

router.get('/routes', (req, res) => {
  let tree = getTree(rootLocation)
  return res.json(tree)
})

module.exports = router
