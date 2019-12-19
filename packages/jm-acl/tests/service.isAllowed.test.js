const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})

let user = null
let roles = 'root'
let resource = '/acl'
let permissions = 'get'

describe('service', () => {
  test('areAnyRolesAllowed', async () => {
    let doc = await service.areAnyRolesAllowed(roles, resource, permissions)
    console.log(doc)
    expect(doc).toBeTruthy()
  })

  test('isAllowed', async () => {
    let doc = await service.isAllowed()
    expect(!doc).toBeTruthy()

    doc = await service.isAllowed(user, resource, permissions)
    expect(doc).toBeTruthy()

    doc = await service.areAnyRolesAllowed(roles, resource, permissions)
    expect(doc).toBeTruthy()
  })
})
