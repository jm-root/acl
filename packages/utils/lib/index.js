const genId = require('./genId')
const { downloadBase64 } = require('./download')
const { md5, sha256 } = require('./crypt')

// 'a, b,c ' => ['a', 'b', 'c']
function split (value, sep = ',') {
  if (value && typeof value === 'string') {
    value = value.split(sep)
    return value.map(item => item.trim())
  }
}

module.exports = {
  genId,
  split,
  downloadBase64,
  md5,
  sha256
}
