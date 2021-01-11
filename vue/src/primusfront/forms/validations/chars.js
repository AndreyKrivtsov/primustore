import {PrimusBaseRules} from './PrimusBaseRules'

export class StringRules extends PrimusBaseRules {
  constructor ({ required = false, maxLength = null, label = null, type = 'input' } = {}) {
    super({required, label, type})
    this.maxLength = maxLength
    this.setRules()
  }

  get maxLengthRule () {
    return (val) => {
      if (this.maxLength === null) { return true }
      let text = `Длина текста должна быть не больше ${this.maxLength}`
      if (val) {
        return val.length <= +this.maxLength ? true : text
      } else {
        return true
      }
    }
  }
  setRules () {
    this.rules = [this.requiredRule, this.maxLengthRule]
  }
}
