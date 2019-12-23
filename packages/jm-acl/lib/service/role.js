const Model = require('./model')
const _ = require('lodash')

module.exports = class Role extends Model {
  constructor ({ service }) {
    super({ service, name: 'role' })

    this.on('beforeSave', this.onBeforeSave.bind(this))
  }

  // 把父角色已拥有的资源权限去掉, 精简化
  async _mergeParent (role) {
    const { acl } = this.service
    const { resources = [], parents = [] } = role
    if (!parents.length) return

    const nodes = {}
    // 资源扁平化
    function flatResources (v, prefix = '') {
      for (const item of v) {
        const key = `${prefix}${item.id}`
        nodes[key] = item
        if (item.children) flatResources(item.children, key)
      }
    }
    flatResources(resources)

    for (const item of parents) {
      const parentResources = await acl.whatResources(item)
      for (const resource of Object.keys(parentResources)) {
        let _permissions = parentResources[resource]
        const node = nodes[resource]
        if (!node) continue
        const { permissions = [] } = node
        if (!permissions.length) continue
        _.pull(permissions, ..._permissions)
        if (!permissions.length) delete node.permissions
      }
    }

    // 排除无权限资源
    function checkEmptyPermissionResources (v) {
      const removeList = []
      v.forEach((item, idx) => {
        const { permissions = [], children = [] } = item
        if (children) {
          const l = checkEmptyPermissionResources(children)
          if (l && l.length) {
            for (const i of _.reverse(l)) {
              children.splice(i, 1)
            }
          }

          if (!children.length) delete item.children
        }
        if (!permissions.length && !children.length) removeList.push(idx)
      })
      return removeList
    }

    const l = checkEmptyPermissionResources(resources)
    if (l && l.length) {
      for (const i of _.reverse(l)) {
        resources.splice(i, 1)
      }
    }
  }

  async onBeforeSave (v) {
    for (const item of v) await this._mergeParent(item)
  }
}
