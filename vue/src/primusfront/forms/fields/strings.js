import {StringRules} from '@/primusfront/forms/validations'
import {WidgetTypes} from '@/primusfront/forms/widgets/consts'
import {assign} from '@/primusfront/utils/object'
import {Field} from '@/primusfront/forms/fields/fields'

export class CharField extends Field {
  constructor (label, obj = {}) {
    let prepObj = {
      maxLength: null,
      BaseRules: StringRules,
      widgetName: obj.choices ? WidgetTypes.select : WidgetTypes.charfield
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
    this.setRules()
  }
}

export class TextAreaField extends CharField {
  constructor (label, obj = {}) {
    let changedObj = assign({ minValue: 3, maxValue: 6, widgetName: WidgetTypes.textarea }, obj)
    super(label, changedObj)
    this.setRules()
  }
}
