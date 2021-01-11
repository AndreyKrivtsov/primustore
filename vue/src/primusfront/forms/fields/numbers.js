import {OrmTypes, WidgetTypes} from '@/primusfront/forms/widgets/consts'
import {IntegerRules, NumberRules, PositiveIntegerRules} from '@/primusfront/forms/validations'
import {assign} from '@/primusfront/utils/object'

import {Field} from '@/primusfront/forms/fields/fields'

export class NumberField extends Field {
  constructor (label, obj) {
    let changedObj = {
      type: 'number',
      minValue: null,
      maxValue: null,
      step: 1,
      orm: {name: OrmTypes.number, attrs: {}},
      RulesClass: NumberRules,
      widgetName: (obj.choices) ? WidgetTypes.select : WidgetTypes.input
    }
    super(label, assign(changedObj, obj))
  }
  prettify (val) {
    if (this.choices) {
      return +this.choices[val] || ''
    }
    return +val
  }
  getRulesArgs () {
    return assign(super.getRulesArgs(), { minValue: this.minValue, maxValue: this.maxValue })
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `Float${requiredDef}`
  }
}

export class IntegerField extends NumberField {
  constructor (label, obj) {
    let changedObj = assign({ step: 1, RulesClass: IntegerRules }, obj)
    if (obj.choices) {
      changedObj.widgetName = WidgetTypes.select
    }
    super(label, changedObj)
    this.setRules()
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `Int${requiredDef}`
  }
}

export class PositiveIntegerField extends IntegerField {
  constructor (label, obj = {}) {
    let changedObj = assign({ minValue: 0, RulesClass: PositiveIntegerRules, keypressTest: /^\d$/ }, obj)
    super(label, changedObj)
    this.minValue = (this.minValue >= 0) ? this.minValue : 0
    this.setRules()
  }
}

export class FloatField extends NumberField {
  constructor (label, obj = {}) {
    let changedObj = assign({ keypressTest: /^(\d|\.|,)$/ }, obj)
    super(label, changedObj)
    this.setRules()
  }
}
