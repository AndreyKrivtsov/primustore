
import { installFactory } from './utils/plugins'
import { widgetsPlugin } from './forms/widgets'
// import { directivesPlugin } from './directives'
import { PFConfigPlugin } from './pf-config'

const NAME = 'PrimusFront'

// --- PrimusFront installer ---
const install = /* #__PURE__ */ installFactory({
  plugins: {
    widgetsPlugin
  }
})

// --- PrimusFront plugin ---
const PrimusFront = /* #__PURE__ */ {
  install,
  NAME
}

export {
  // Installer exported in case the consumer does not import `default`
  // as the plugin in CommonJS build (or does not have interop enabled for CommonJS)
  // Both the following will work:
  //   PrimusFront = require('primusfront')
  //   PrimusFront = require('primusfront').default
  //   Vue.use(PrimusFront)
  install,
  NAME,
  // PrimusFront config plugin
  PFConfigPlugin,
  // `PFConfigPlugin` has been documented as `PFconfig` as well,
  // so we add an alias to the shorter name for backwards compat
  PFConfigPlugin as PFConfig,
  // Main PrimusFront plugin
  PrimusFront
}

export {}

export default PrimusFront
