import DEFAULTS from './config-defaults'

describe('utils/config-defaults', () => {
  it('default configuration is immutable', async () => {
    // Existing properties cannot be mutated
    // New Properties cannot be added
    expect(DEFAULTS.foobar).not.toBeDefined()
    try {
      DEFAULTS.foobar = 'foobar'
    } catch {}
    expect(DEFAULTS.foobar).not.toBeDefined()
    expect(DEFAULTS.PFWidgetInput.foobar).not.toBeDefined()
    try {
      DEFAULTS.PFWidgetInput.foobar = 'foobar'
    } catch {}
    expect(DEFAULTS.PFWidgetInput.foobar).not.toBeDefined()

    // Properties cannot be deleted
    expect(DEFAULTS.PFWidgetInput).toBeDefined()
    try {
      delete DEFAULTS.PFWidgetInput
    } catch {}
    expect(DEFAULTS.PFWidgetInput).toBeDefined()
  })
})
