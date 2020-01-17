const log = require('jm-log4js')
const logger = log.getLogger('acl-mq')
const MS = require('jm-ms')

let ms = new MS()

module.exports = function (opts, app) {
  ['gateway'].forEach(function (key) {
    process.env[key] && (opts[key] = process.env[key])
  })

  let o = {
    ready: true,

    onReady: function () {
      return this.ready
    }
  }

  const bind = async (name, uri) => {
    uri || (uri = '/' + name)
    o[name] = await ms.client({
      uri: opts.gateway + uri
    })
  }

  if (!app.modules.acl) {
    logger.warn('no acl module found. I will not work.')
    return o
  }
  if (!opts.gateway) {
    logger.warn('no gateway config. I will not work.')
    return o
  }

  bind('mq')

  const { acl } = app.modules

  const send = async function (topic, message) {
    return o.mq.post(`/${topic}`, { message })
      .catch(e => {
        logger.error(`send mq fail. topic: ${topic} message: ${JSON.stringify(message)}`)
        logger.error(e)
      })
  }
  acl
    .on('acl.update', function (opts) {
      opts && (send('acl.update', opts))
    })
}
