import { pluginFactory } from '../../../utils/plugins'

import { default as PFBootstrap4SelectWidget } from './select'
import { default as PFBootstrap4InputWidget } from './input'
import { default as PFBootstrap4DateWidget } from './date'
import { default as PFBootstrap4TimeWidget } from './time'
import { default as PFBootstrap4DateTimeWidget } from './datetime'
import { default as PFBootstrap4TextAreaWidget } from './textarea'
import { default as PFBootstrap4CheckWidget } from './check'

const Bootstrap4WidgetPlugin = /* #__PURE__ */ pluginFactory({
  components: {
    PFBootstrap4SelectWidget,
    PFBootstrap4InputWidget,
    PFBootstrap4DateWidget,
    PFBootstrap4TimeWidget,
    PFBootstrap4DateTimeWidget,
    PFBootstrap4TextAreaWidget,
    PFBootstrap4CheckWidget
  }
})

export { Bootstrap4WidgetPlugin, PFBootstrap4SelectWidget, PFBootstrap4InputWidget, PFBootstrap4DateWidget, PFBootstrap4TimeWidget, PFBootstrap4DateTimeWidget, PFBootstrap4TextAreaWidget, PFBootstrap4CheckWidget }
