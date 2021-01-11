import BaseWidgetMixin from '@/primusfront/forms/widgets/baseWidget'
import BaseFieldSet from '@/primusfront/components/baseFieldSet'
import {isObject} from '@/primusfront/utils/object'

export const PrimusFormSetComponentMixin = {
  components: {BaseFieldSet},
  mixins: [BaseWidgetMixin],
  render: require('./templates/formSetTemplate').default.render,
  data () {
    return {
      valid: {},
      ids: []
    }
  },
  props: {
    comboFieldName: {
      type: String,
      default: 'name'
    }
  },
  computed: {
    Model: function () { return this.adminInstance.Model },
    form: function () { return this.adminInstance.form },
    componentName: function () { return this.adminInstance.componentBaseName },
    formKeys: function () { return this.form.getVisibleKeys().filter(i => i !== this.comboFieldName) },
    fieldComponentName: function () { return this.adminInstance.basedComponents.combo.componentName },
    dense: function () { return true },
    val: function () {
      // вычисляемое свойство для подготовки значения
      if (Array.isArray(this.value)) {
        return this.value
      }
      return []
    }
  },
  methods: {
    addItem: function () {
      let initialObject = this.adminInstance.createInitialObject()
      this.ids.push('')
      this.val.push(initialObject)
      this.$emit('input', this.val)
    },
    changeReference (elementId) {
      let item = this.ids[elementId]
      // копируем значения из эталона в элемент
      if (isObject(item)) {
        let name = item.text
        let id = item.value
        let modelsInstance = this.Model.find(id)
        this.formKeys.forEach(k => { this.val[elementId][k] = modelsInstance[k] })
        this.val[elementId][this.comboFieldName] = name
        this.ids[elementId] = name
      } else {
        this.val[elementId][this.comboFieldName] = item
      }
    },
    deleteItem: function (elementId) {
      this.val.splice(elementId, 1)
      this.$emit(this.val)
    }
  },
  created () {
    this.ids = this.val.map(v => v[this.comboFieldName])
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.value) {
        let initialObject = this.adminInstance.createInitialObject()
        this.$emit('input', [initialObject])
      }
    })
  }
}

export default PrimusFormSetComponentMixin
