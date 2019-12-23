const _ = require('lodash')
const Acl = require('acl')
const { memoryBackend: MemoryBackend } = Acl
const log = require('jm-log4js')
const { fingerprint } = require('../utils')
const logger = log.getLogger('acl')

function _comparePermissions (lefts, rights) {
  const doc = _.difference(rights, lefts)
  _.pullAll(rights, doc)
}

function _compareNode (left, right) {
  if (right.permissions) _comparePermissions(left.permissions, right.permissions)
  if (right.children) _compareNodes(left.children, right.children)
}

function _compareNodes (lefts, rights) {
  const doc = _.differenceBy(rights, lefts, 'id')
  _.pullAll(rights, doc)
  for (const right of rights) {
    const left = _.find(lefts, { id: right.id })
    _compareNode(left, right)
  }
}

/**
 * 比较资源和角色，如果角色中对应的资源或者权限不存在, 自动删除
 * @param resources
 * @param roles
 */
function _compareRoles (resources, roles) {
  for (const role of roles) {
    if (!role.resources) continue
    _compareNodes(resources, role.resources)
  }
}

async function _allowResource (acl, role, resource, prefix = '') {
  const { id, permissions, children } = resource
  if (permissions) {
    await acl.allow(role, prefix + id, permissions)
    logger.debug(`allow ${role} ${prefix + id} ${permissions}`)
  }
  if (children) await _allowResources(acl, role, children, prefix + id)
}

async function _allowResources (acl, role, resources, prefix = '') {
  for (const resource of resources) {
    await _allowResource(acl, role, resource, prefix)
  }
}

async function _createAcl (service) {
  const { aclConfig: { roles } } = service
  const acl = new Acl(new MemoryBackend())
  for (const role of roles) {
    const { id, parents, resources } = role
    if (parents) {
      await acl.addRoleParents(id, parents)
      logger.debug(`addRoleParents ${id}: ${parents}`)
    }
    if (resources) {
      await _allowResources(acl, id, resources)
    }
  }
  service.acl = acl
}

/**
 * 检查角色状态，如果已经修改，更新 acl
 * @returns {Promise<void>}
 */
async function validateRoles (service) {
  const { aclConfig: { resources, roles }, fingerprints } = service
  _compareRoles(resources, roles)
  const key = fingerprint(roles)
  if (key === fingerprints.roles) return false// 无变化
  fingerprints.roles = key
  await _createAcl(service)
  logger.info(`roles changed.`)
  return true
}

/**
 * 检查资源状态，如果已经修改，更新 isAllowed
 * @returns {Promise<void>}
 */
async function validateAclConfig (service) {
  const { aclConfig: { resources }, fingerprints } = service
  let changed = false
  const key = fingerprint(resources)
  if (key !== fingerprints.resources) {
    fingerprints.resources = key
    changed = true
    logger.info(`resources changed.`)
  }

  const ret = await validateRoles(service)
  ret && (changed = true)

  if (changed) {
    require('./allow')(service)
  }

  return changed
}

module.exports = { validateAclConfig }
