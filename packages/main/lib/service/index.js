module.exports = class extends require('jm-acl') {
  constructor (opts = {}) {
    super(opts)
  }

  router (opts) {
    const dir = require('path').join(__dirname, '../router')
    return new (require('router'))(this, { dir, ...opts }).router
  }
}
