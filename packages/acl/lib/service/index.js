module.exports = class extends require('jm-acl') {
  constructor (opts = {}) {
    super(opts)
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
