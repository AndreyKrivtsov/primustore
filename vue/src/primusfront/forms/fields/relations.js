import {assign} from '@/primusfront/utils/object'
import {WidgetTypes} from '@/primusfront/forms/widgets/consts'
import {Field} from '@/primusfront/forms/fields/fields'

export class RelatedField extends Field {
  constructor (label, obj = {}) {
    let prepObj = {
      choicesKeyName: 'id',
      choicesValueName: 'name',
      GQLType: ''
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `${this.GQLType}${requiredDef}`
  }
}
export class FKField extends RelatedField {
  constructor (label, obj = {}) {
    let prepObj = {
      widgetName: WidgetTypes.fkfield
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
  }
}

export class MultiField extends RelatedField {
  constructor (label, obj = {}) {
    let prepObj = {
      widgetName: WidgetTypes.multifield
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
  }
}

export class ForwardField extends RelatedField {
  constructor (label, obj = {}) {
    let prepObj = {
      forwardComponent: { name: null, attrs: {} },
      widgetName: WidgetTypes.forward
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
  }
  prettify (val) {
    if (val === undefined) { return '' }
    let vm = this
    let choicesValueName = this.choicesValueName
    let pretifier = this.forwardComponent.prettify || function (i) {
      let modelInstance = vm.choices ? vm.choices.find(i) : null
      return modelInstance ? modelInstance[choicesValueName] : ''
    }
    let str
    try {
      str = pretifier(val)
    } catch (e) {
      str = this.choices ? pretifier(this.choices.find(val)) : val
    }
    return str
  }
}

export class ComboboxField extends RelatedField {
  constructor (label, obj = {}) {
    let prepObj = {
      widgetName: WidgetTypes.combobox
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
  }
}
