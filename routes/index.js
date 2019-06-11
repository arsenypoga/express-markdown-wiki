const wiki = require('./wiki')

module.exports = {
  wiki: express => wiki(express)
}
