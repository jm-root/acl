const MS = require('jm-ms-core')
const ms = new MS()

/**
 * 创建指定hmodel的CRUD路由
 * @param model
 * @returns {*}
 */
module.exports = function (model) {
  const router = ms.router()

  async function load () {
    const rows = await model.load()
    return { rows }
  }

  async function save ({ data }) {
    await model.save(data.rows)
    return { ret: 1 }
  }

  async function clear () {
    await model.clear()
    return { ret: 1 }
  }

  router
    .add('/', 'get', load)
    .add('/', 'post', save)
    .add('/', 'delete', clear)

  return router
}
