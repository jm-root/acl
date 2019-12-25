const MS = require('jm-ms-core')
const ms = new MS()

/**
 * 创建指定hmodel的CRUD路由
 * @param model
 * @returns {*}
 */
module.exports = function (model) {
  const router = ms.router()

  async function find () {
    const rows = await model.load()
    return { rows }
  }

  async function update ({ data }) {
    await model.save(data.rows)
    return { ret: 1 }
  }

  async function clear () {
    await model.clear()
    return { ret: 1 }
  }

  async function findOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    return model.findOne(id)
  }

  async function updateOne ({ params: { id }, data }) {
    id && (id = decodeURIComponent(id))
    await model.updateOne(id, { id, ...data })
    return { ret: 1 }
  }

  async function deleteOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    await model.deleteOne(id)
    return { ret: 1 }
  }

  router
    .add('/', 'get', find)
    .add('/', 'post', update)
    .add('/', 'delete', clear)
    .add('/:id', 'get', findOne)
    .add('/:id', 'put', updateOne)
    .add('/:id', 'delete', deleteOne)

  return router
}
