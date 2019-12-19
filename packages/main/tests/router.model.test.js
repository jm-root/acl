const $ = require('./service')
const { defaultAclConfig } = $

let router = null

beforeAll(async () => {
  await $.onReady()
  router = $.router()
})

describe('router', () => {
  test('/permissions', async () => {
    let doc = await router.delete(`/permissions`)
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await router.post(`/permissions`, { rows: defaultAclConfig.permissions })
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await router.get(`/permissions`)
    console.log(doc)
    expect(doc).toBeTruthy()
  })

  test('/resources', async () => {
    let doc = await router.delete(`/resources`)
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await router.post(`/resources`, { rows: defaultAclConfig.resources })
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await router.get(`/resources`)
    console.log(doc)
    expect(doc).toBeTruthy()
  })

  test('/roles', async () => {
    let doc = await router.delete(`/roles`)
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await router.post(`/roles`, { rows: defaultAclConfig.roles })
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await router.get(`/roles`)
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
