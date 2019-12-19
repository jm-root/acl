const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $.user
})

describe('service', () => {
  test('root', async () => {
    let doc = null
    const opts = {
      id: '596d5cb3baeeaf00203de4ec',
      nick: 'root',
      roles: ['root']
    }
    doc = await service.create(opts)
    expect(doc).toBeTruthy()
  })

  test('CURD', async () => {
    let doc = null
    const opts = {
      nick: 'test',
      roles: ['root']
    }
    doc = await service.create(opts)
    expect(doc).toBeTruthy()

    const { id } = doc
    doc = await service.update(id, { nick: 'abc' })
    expect(doc).toBeTruthy()

    doc = await service.findOne(id)
    expect(doc).toBeTruthy()

    doc = await service.addRoles(id, 'a', 'b')
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await service.roles(id)
    console.log(doc)

    doc = await service.removeRoles(id, 'a', 'b')
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await service.roles(id)
    console.log(doc)

    doc = await service.delete(id)
    expect(doc === id).toBeTruthy()
  })

  test('findAll', async () => {
    let doc = await service.findAll()
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await service.findAll({ fields: 'id, nick, roles' })
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
