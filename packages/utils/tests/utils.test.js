const { split } = require('../')

describe('utils', () => {
  test('split', () => {
    console.log(split(1))
    console.log(split(',4, 6'))
    console.log(split(',7| 8', '|'))
    console.log(split('1 2   3', ' '))
    console.log(split([]))
    console.log(split({}))
    console.log(split())
  })
})
