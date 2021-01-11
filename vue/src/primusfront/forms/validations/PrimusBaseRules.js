export class PrimusBaseRules {
  constructor ({ required = false, label = null, type = 'input' } = {}) {
    Object.keys(arguments[0]).forEach(key => {
      this[key] = arguments[0][key]
    })
    this.rules = []
    this.setRules()
  }

  get requiredRule () {
    return (val) => {
      if (!this.required) { return true }
      let text = `Поле должно быть заполнено`
      let st = `${val}`
      if (val === null || val === undefined) { return text }
      return st.length > 0 ? true : text
    }
  }

  setRules () {
    this.rules = [this.requiredRule]
  }
  getRules () {
    return this.rules
  }
  resolved (val) {
    return this.getRules().map(func => func(val))
  }
}
