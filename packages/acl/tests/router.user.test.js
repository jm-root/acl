const $ = require('./service')

let router = null

beforeAll(async () => {
  await $.onReady()
  router = $.router()
})

describe('router', () => {
  test('post /users', async () => {
    const doc = await router.post(`/users`, { id: 'test', nick: 'test', roles: ['root'] })
    console.log(doc)
    expect(doc).toBeTruthy()
  })

  test('get /users', async () => {
    const doc = await router.get(`/users`)
    console.log(doc)
    expect(doc).toBeTruthy()
  })

  test('put /users/:id', async () => {
    const doc = await router.put(`/users/abc`, { nick: 'test', roles: ['root'] })
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
