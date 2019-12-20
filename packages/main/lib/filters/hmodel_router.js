const MS = require('jm-ms-core')
const ms = new MS()

/**
 * 数据创建过滤器，检查权限
 * @param service
 * @param user
 * @param role
 * @param type
 * @param data
 * @param creator
 * @param params
 * @param id
 * @returns {Promise<void>}
 */
function filterCreate (service) {
  return async ({ user, data }) => {
    if (user) {
      data.creator = user
    }
  }
}

/**
 * 创建指定model的CRUD路由
 * @param model
 * @returns {*}
 */
module.exports = function (model) {
  const router = ms.router()

  async function list ({ data }) {
    return model.findAll(data)
  }

  async function findOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    return model.findOne(id)
  }

  async function create ({ data }) {
    return model.createOrUpdate(data)
  }

  async function updateOne ({ data, params: { id } }) {
    id && (id = decodeURIComponent(id))
    return model.update(id, data)
  }

  async function deleteOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    return model.delete(id)
  }

  router
    .use(filterCreate(model.service))
    .add('/', 'get', list)
    .add('/', 'post', create)
    .add('/:id', 'get', findOne)
    .add('/:id', 'put', updateOne)
    .add('/:id', 'delete', deleteOne)

  return router
}
