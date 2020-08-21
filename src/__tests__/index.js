const plugins = require('../index');

describe('@skarllet/plugins', () => {
  test('should register a plugin without throwing an error', async () => {
    const plugin = plugins.create()
    const setupCallback = jest.fn()

    await plugin.register({
      name: 'foo',
      setup: setupCallback
    })

    expect(setupCallback).toHaveBeenCalled()
  })

  test(`should register a plugin and 'use' it`, async () => {
    const plugin = plugins.create()

    const text = 'i should match!'

    await plugin.register({
      name: 'foo',
      setup: () => text
    })

    const foo = plugin.use('foo')

    expect(foo).toMatch(text)
  })

  test(`should register two plugins, that 'bar' uses 'foo'`, async done => {
    expect.assertions(1)

    const plugin = plugins.create()

    const text = 'i should match!'

    await plugin.register({
      name: 'foo',
      setup: () => text
    })

    await plugin.register({
      name: 'bar',
      setup: plugin => {
        const foo = plugin.use('foo')

        expect(foo).toMatch(text)
        done()
      }
    })
  })
})