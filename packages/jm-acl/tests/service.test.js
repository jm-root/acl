const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})

describe('service', () => {
  test('clear', async () => {
    await service.clear()
  })

  test('load', async () => {
    let doc = await service.load()
    console.log(doc)
  })

  test('save', async () => {
    await service.save()
  })

  test('hasRole', async () => {
    const id = 'test_user'
    await service.user.setRoles(id, ['user'])
    const ret = await service.hasRole(id, 'user')
    expect(ret).toBeTruthy()
    await service.user.delete(id)
  })
})
