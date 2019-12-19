const modelRouter = require('./model_router')
const hmodelRouter = require('./hmodel_router')

/**
 * 处理请求头headers中acl_user_key, acl_role_key, 如果存在挂载到opts.user opts.role备用
 * @param opts
 */
function filterAclKey (service) {
  return opts => {
    const { aclUserKey, aclRoleKey } = service
    const { headers = {} } = opts
    opts.user = headers[aclUserKey]
    opts.role = headers[aclRoleKey]
  }
}

module.exports = {
  filterAclKey,
  modelRouter,
  hmodelRouter
}
