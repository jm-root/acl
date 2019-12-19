const Model = require('./model')

module.exports = class Resource extends Model {
  constructor ({ service }) {
    super({ service, name: 'resource' })
  }
}
