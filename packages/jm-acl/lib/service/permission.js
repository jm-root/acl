const Model = require('./model')

module.exports = class Permission extends Model {
  constructor ({ service }) {
    super({ service, name: 'permission' })
  }
}
