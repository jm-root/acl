module.exports = {
  appenders: {
    console: { type: 'console' },
    acl: {
      type: 'dateFile',
      filename: 'logs/acl',
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'console' ], level: 'info' },
    acl: { appenders: [ 'console', 'acl' ], level: 'info' }
  }
}
