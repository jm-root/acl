const $ = require('./service')

let router = null

beforeAll(async () => {
  await $.onReady()
  router = $.router()
})

describe('router', () => {
  test('isAllowed', async () => {
    let doc = await router.get(`/isAllowed`, { resource: '/acl', permissions: 'get' })
    expect(doc).toBeTruthy()
  })

  test('get user roles', async () => {
    let doc = await router.get(`/users/test/roles`)
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
