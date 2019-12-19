const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $.role
})

describe('service', () => {
  test('load', async () => {
    let doc = await service.load()
    console.log(doc)
    expect(doc).toBeTruthy()

    doc = await service.load({ fields: 'id, title' })
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
