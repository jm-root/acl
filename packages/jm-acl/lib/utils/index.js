const crypto = require('crypto')
const genId = require('./genId')

function fingerprint (opts) {
  const key = typeof opts === 'object' ? JSON.stringify(opts) : opts
  const sha256 = crypto.createHash('sha256')
  sha256.update(key)
  return sha256.digest('hex')
}

function makeArray (arr) {
  return Array.isArray(arr) ? arr : [arr]
}

// 'a, b,c ' => ['a', 'b', 'c']
function split (fields) {
  if (!fields) return null
  if (Array.isArray(fields)) return fields
  fields = fields.split(',')
  return fields.map(item => item.trim())
}

module.exports = {
  genId,
  fingerprint,
  makeArray,
  split
}
