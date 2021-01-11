export const BaseWidgetMixin = {
  props: {
    'name': String,
    'field': Object,
    'value': [String, Number, Object, Array, File, Boolean],
    'choices': [Object, Function],
    'readonly': { type: Boolean, default: false }
  },
  methods: {
    inputHandler: function (val) {
      this.$emit('input', val)
    },
    changeHandler: function (val) {
      this.$emit('change', val)
    },
    keypressHandler: function (e) {
      if (this.keypressTest && !this.keypressTest.test(e.key)) {
        e.preventDefault()
      }
    }
  },
  computed: {
    hasFieldObject: function () {
      return this && this.field
    },
    val: function () {
      // вычисляемое свойство для подготовки значения
      if (Array.isArray(this.value)) { return this.value }
      if (this.value || this.value === 0) { return `${this.value}` }
      if (this.hasFieldObject && this.field.defaultValue !== null) {
        this.inputHandler(this.field.defaultValue)
        return `${this.field.defaultValue}`
      }
      return null
    },
    hideDetails: function () {
      return this.readonly
    },
    disabled: function () {
      if (this.readonly) { return true }
      if (this.hasFieldObject && this.field.editable) {
        return !this.field.editable
      } return false
    },
    errors: function () {
      if (this.hasFieldObject) {
        return this.field.errors
      } else {
        return []
      }
    },
    rules: function () {
      if (this.hasFieldObject) {
        return this.field.rules
      } else {
        return []
      }
    },
    minValue: function () {
      if (this.hasFieldObject) {
        return this.field.minValue
      } else {
        return 0
      }
    },
    keypressTest: function () {
      if (this.hasFieldObject) {
        return this.field.keypressTest
      }
    }
  }
}

export default BaseWidgetMixin
