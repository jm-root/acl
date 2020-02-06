const { split } = require('utils')

// 给定的参数, 如果是字符串拆分为数组
module.exports = function makeArray (...args) {
  return function ({ data = {} } = {}) {
    for (const key of args) {
      const value = split(data[key])
      value && (data[key] = value)
    }
  }
}
