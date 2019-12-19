const Model = require('./model')

module.exports = class Role extends Model {
  constructor ({ service }) {
    super({ service, name: 'role' })
  }
}
