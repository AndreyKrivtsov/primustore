
// все атрибуты, которые начинаются на _ пропускаются как сервисные
export class PrimusForm {
  constructor ({ instance = {} } = {}) {
    this._instance = instance // для работы с инстансом данных
    this._fieldsObj = this.fields()
    this._keys = Object.keys(this._fieldsObj) || []
    this.getKeys().forEach(key => {
      this._fieldsObj[key].setName(key)
      // this._fieldsObj[key].setParent(this)
      this[key] = this._fieldsObj[key]// Может быть запихнуть в прокси, которые проверяет наличие атрибута в fields() и отдает его оттуда?
    })
    this._fields = this.getKeys().map(k => this._fieldsObj[k]) || []
  }
  setInstance (instance) {
    this._instance = instance
    this.getKeys().forEach(k => {
      if (k in instance) {
        this[k].setValue(instance[k])
      }
    })
  }
  fields () {
    return {}
  }
  getKeys () {
    return this._keys || Object.keys(this.fields())
  }
  getFieldNameListForApi () {
    this.getKeys().filter(fieldName => this[fieldName].preventForModel)
  }
  getVisibleFields () {
    return this.getFields().filter(field => field.visible === true) || []
  }
  getVisibleKeys () {
    return this.getKeys().filter(key => this[key].visible === true) || []
  }
  getFields () {
    return this._fields || this.getKeys().map(k => this.fields()[k])
  }
  getKeyFieldPairs () {
    return this.getKeys().map(key => [key, this[key]])
  }
  getVisibleKeyFieldPairs () {
    return this.getVisibleKeys().map(key => [key, this[key]])
  }
  // генерирует атрибуты для ./src/models/<SomeModel>.js
  generateModelFields () {
    let obj = {}
    let vm = this
    this.getKeys().forEach(k => {
      let orm = vm[k].orm
      obj[k] = this[orm.name](orm.attrs)
    })
    return obj
  }

  createInitialObject () {
    let vm = this
    let obj = {}
    this.getVisibleKeys().forEach(k => { obj[k] = vm[k].defaultValue || null })
    return obj
  }
}

export const listFields = []
export const form = new PrimusForm()
export default form
