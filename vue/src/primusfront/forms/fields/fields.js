import { getComponentConfig } from '../../utils/config'
import { capitalize } from '../../utils/string'
import { PrimusBaseRules } from '../validations'
import {assign} from '@/primusfront/utils/object'
import {OrmTypes, WidgetTypes} from '@/primusfront/forms/widgets/consts'

// let moment = require('moment')

// noinspection JSUnresolvedVariable
export class Field {
  constructor (
    label,
    { type = 'text', // <input type=<type>
      defaultValue = null, // значение по умолчанию
      choices = null, // Объект или массив данных для полей выбора
      editable = true, // редактируемо ли?
      required = false, // требуется ли?
      visible = true, // видимо ли, отдельным свойством, type=hidden может быть не тем, что надо
      placeholder = '', // текст помошник
      widgetName = WidgetTypes.input, // указание названия виджета который ответственнен за показ
      errors = [], // список ошибок
      RulesClass = PrimusBaseRules, // класс валидатор данных
      keypressTest = null, // обработчик нажатия клавиш
      preventForModel = false, // предотвращает попадание поля в модель
      preventForGQL = false, // предотвращает попадание в GQL
      name = '', // Название поля
      value = null, // Значение поля
      orm = {name: OrmTypes.attr, attrs: {}} // задание атрибутов и типа поля для генерации Vuex-Orm model
    } = {}
  ) {
    // подключение аргументов, включая те, которые были не определены в рамках базовой модели Field
    let defaultFieldArgs = {type, defaultValue, choices, editable, required, visible, placeholder, widgetName, errors, RulesClass, keypressTest, preventForModel, preventForGQL, orm}
    let fullArgs = assign({}, defaultFieldArgs, arguments[1])
    Object.keys(fullArgs).forEach(key => { this[key] = fullArgs[key] })
    // конец подключения
    this.label = label
    this.key = 0
    this.name = ''
    this.parent = null
    this.value = null
    this.transErrors = []
  }
  getRulesArgs () {
    return { required: this.required, label: this.label, type: this.type }
  }
  setName (name) { this.name = name }
  setParent (parent) { this.parent = parent }
  setValue (value) { this.value = value }
  stringify (value) { return `${this.name}: "${value}"` }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `String${requiredDef}`
  }
  setRules () {
    this.rulesClassInstance = new this.RulesClass(this.getRulesArgs())
  }
  get rules () {
    if (this && this.rulesClassInstance) {
      return this.rulesClassInstance.getRules()
    }
    return []
  }

  get ormField () {
    return [this.orm.name, assign({}, this.orm.attrs)]
  }
  get componentName () {
    let design = capitalize(getComponentConfig('Global', 'defaultDesign'))
    let widgetName = WidgetTypes.input
    if (this && this.widgetName) {
      widgetName = this.widgetName
    }
    return `PF${design}${widgetName}Widget`
  }

  changeMaxValue (newVal) {
    this.maxValue = newVal
    this.rulesClassInstance.maxValue = newVal
  }

  changeMinValue (newVal) {
    this.minValue = newVal
    this.rulesClassInstance.minValue = newVal
  }

  // resolveRules (val) { // unnessesary. use only for debug
  //   if (this && this.rulesClassInstance) {
  //     return this.rulesClassInstance.resolved(val)
  //   }
  //   return []
  // }

  prettify (val) { // вывод поля
    return (this.choices) ? this.choices[val] || '' : val
  }
  updateChoices (choices) {
    this.choices = choices
    this.key = this.key + 1
  }
  addErrors (errors = []) {
    this.errors = errors
    let transAPIErrors = getComponentConfig('API', 'ERRORS_TRANSLATE')
    let transErrors = []
    for (let i in errors) {
      let error = errors[i]
      let trans = transAPIErrors[error] || null
      if (trans) {
        transErrors.push(trans)
      } else {
        transErrors.push(error)
      }
    }
    this.transErrors = transErrors
    this.key = this.key + 1
  }
}

export class IDField extends Field {
  constructor (label = null, obj = {}) {
    if (!label) {
      label = 'ID'
    }
    let changedObj = assign({ editable: false, visible: false, orm: {name: OrmTypes.uid, attrs: {}} }, obj)
    super(label, changedObj)
    this.setRules()
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `String${requiredDef}`
  }
}
export class FileField extends Field {
  constructor (label, obj = {}) {
    let changedObj = assign({ type: 'file', widgetName: WidgetTypes.file }, obj)
    super(label, changedObj)
    this.setRules()
  }
}

// noinspection SpellCheckingInspection
export class DateField extends Field {
  constructor (label, obj = {}) {
    let changedObj = assign({ type: 'date', widgetName: WidgetTypes.date, orm: {name: OrmTypes.string, attrs: {}} }, obj)
    super(label, changedObj)
    this.setRules()
  }
  prettify (val) {
    const moment = require('moment')
    return val ? moment(val).format('DD-MM-YYYY') : '-'
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `Date${requiredDef}`
  }
}

// noinspection SpellCheckingInspection
export class DateTimeField extends Field {
  constructor (label, obj = {}) {
    let changedObj = assign({ type: 'datetime', widgetName: WidgetTypes.datetime, orm: {name: OrmTypes.string, attrs: {}} }, obj)
    super(label, changedObj)
    this.setRules()
  }
  prettify (val) {
    const moment = require('moment')
    return val ? moment(val).utcOffset(0).format('LLLL') : '-'
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `DateTime${requiredDef}`
  }
}

export class BoolField extends Field {
  constructor (label, obj = {}) {
    let prepObj = {
      widgetName: WidgetTypes.select,
      choices: {1: 'Да', 0: 'Нет'},
      defaultValue: null
    }
    let changedObj = assign(prepObj, obj)
    super(label, changedObj)
  }
  toGQLType () {
    let requiredDef = this.required ? '!' : ''
    return `Boolean${requiredDef}`
  }
}
