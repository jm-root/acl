module.exports = class extends require('jm-acl') {
  constructor (opts = {}) {
    super(opts)

    const {
      acl_user_key: aclUserKey = 'acl_user',
      acl_role_key: aclRoleKey = 'acl_role'
    } = opts

    Object.assign(this, {
      aclUserKey,
      aclRoleKey
    })
  }

  router (opts) {
    const dir = require('path').join(__dirname, '../router')
    return new (require('router'))(this, { dir, ...opts }).router
  }
}
