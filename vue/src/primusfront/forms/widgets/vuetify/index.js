import { pluginFactory } from '../../../utils/plugins'

import { default as PFVuetifySelectWidget } from './select'
import { default as PFVuetifyInputWidget } from './input'
import { default as PFVuetifyFileInputWidget } from './file'
import { default as PFVuetifyDateWidget } from './date'
import { default as PFVuetifyTimeWidget } from './time'
import { default as PFVuetifyDateTimeWidget } from './datetime'
import { default as PFVuetifyTextAreaWidget } from './textarea'
import { default as PFVuetifyCheckWidget } from './check'
import { default as PFVuetifyFKFieldWidget } from './fkfield'
import { default as PFVuetifyComboboxWidget } from './combobox'
import { default as PFVuetifyMultipleFieldWidget } from './multifield'

const requireComponent = require.context(
  '.',
  false,
  /.*\.vue$/
)
const ComponentsToReg = new Map(requireComponent.keys().map(fileName => {
  // Получение конфигурации компонента
  const componentConfig = requireComponent(fileName)
  const conf = componentConfig.default || componentConfig
  return [conf.name, conf]
}))
const VuetifyWidgetPlugin = pluginFactory({
  components: Object.fromEntries(ComponentsToReg)
})

export { VuetifyWidgetPlugin, PFVuetifySelectWidget, PFVuetifyInputWidget,
  PFVuetifyFileInputWidget, PFVuetifyDateWidget, PFVuetifyTimeWidget, PFVuetifyDateTimeWidget, PFVuetifyTextAreaWidget, PFVuetifyCheckWidget,
  PFVuetifyFKFieldWidget, PFVuetifyComboboxWidget, PFVuetifyMultipleFieldWidget }
