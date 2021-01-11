import { pluginFactory } from '../../utils/plugins'

import { VuetifyWidgetPlugin } from './vuetify'
import { Bootstrap4WidgetPlugin } from './bootstrap4'

export const widgetsPlugin = /* #__PURE__ */ pluginFactory({
  plugins: {
    VuetifyWidgetPlugin,
    Bootstrap4WidgetPlugin
  }
})
