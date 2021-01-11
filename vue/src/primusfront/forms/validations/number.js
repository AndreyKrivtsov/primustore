import {PrimusBaseRules} from './PrimusBaseRules'

export class NumberRules extends PrimusBaseRules {
  constructor ({ minValue = null, maxValue = null, required = false, label = null, type = 'input' } = {}) {
    super({required, label, type})
    this.minValue = minValue
    this.maxValue = maxValue
    this.setRules()
  }
  get isNumber () {
    return (val) => {
      let text = `Значение должно быть числом`
      if (val) {
        return Number.isNaN(val) ? text : true
      } else {
        return true
      }
    }
  }

  get minValueRule () {
    return (val) => {
      if (this.minValue === null) { return true }
      let text = `Значение должно быть не меньше ${this.minValue}`
      return +val >= +this.minValue ? true : text
    }
  }

  get maxValueRule () {
    return (val) => {
      if (this.maxValue === null) { return true }
      let text = `Значение должно быть не больше ${this.maxValue}`
      return +val <= +this.maxValue ? true : text
    }
  }
  setRules () {
    this.rules = [this.requiredRule, this.minValueRule, this.maxValueRule]
  }
}

export class IntegerRules extends NumberRules {
  constructor (obj) {
    super(obj)
    this.setRules()
  }
  get isInteger () {
    return (val) => {
      let text = `Значение должно быть целым`
      if (val) {
        let number = Number(val)
        return Number.isInteger(number) ? true : text
      }
      return true
    }
  }
  setRules () {
    this.rules = [this.requiredRule, this.isInteger, this.minValueRule, this.maxValueRule]
  }
}

export class PositiveIntegerRules extends IntegerRules {
  get minValueRule () {
    return (val) => {
      if (this.minValue === null) {
        return true
      }
      let text = `Значение должно быть не меньше ${this.minValue}`
      if (+val < 0) { return 'Значение должно быть больше 0' }
      return +val >= +this.minValue ? true : text
    }
  }
}
