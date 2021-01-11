import { PrimusForm } from '@/primusfront/forms/PrimusForm'
import BaseFieldSet from '@/primusfront/components/baseFieldSet'
import {assign} from '@/primusfront/utils/object'

export const BaseItemForm = {
  name: 'BaseItemForm',
  components: {
    BaseFieldSet
  },
  props: {
    form: PrimusForm,
    instance: Object,
    fields: {
      type: Array,
      default: () => []
    },
    valid: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formKeys () {
      return this.form.getVisibleKeys()
    }
  },
  methods: {
    validate () {
      return this.$refs.form && this.$refs.form.validate()
    },
    resetValidation () {
      return this.$refs.form && this.$refs.form.resetValidation()
    },
    renderField (field) {
      if (Array.isArray(field)) {
        return field.map(this.renderField)
      }

      if (typeof field === 'object' && field.type === 'custom') {
        return [this.$createElement('v-col', [field.render(this.$createElement)])]
      }

      return [this.$createElement('v-col', [
        this.$createElement(this.form[field].componentName, {
          props: {
            field: this.form[field],
            name: field,
            choices: this.form[field].choices,
            readonly: this.readonly,
            value: this.instance[field]
          },
          on: {
            input: (value) => {
              this.$set(this.instance, field, this.form[field].type === 'number' ? parseFloat(value) : value)
            }
          }
        })
      ])]
    },
    renderFormFields () {
      const fields = this.fields.length > 0 ? this.fields : this.formKeys

      return fields.map((field, index) => {
        const isFormField = typeof this.form[field] !== 'undefined'

        return this.$createElement(
          'v-row',
          {
            key: isFormField ? field + this.form[field].key : index,
            class: ['form-group', { field: isFormField }]
          },
          this.renderField(field)
        )
      })
    }
  },
  render (h) {
    return h(
      'v-form',
      {
        ref: 'form',
        props: { valid: this.valid, disabled: this.readonly },
        on: {
          input: (value) => this.$emit('input', value),
          submit: (event) => event.preventDefault()
        }
      },
      [h('base-field-set',
        {
          props: assign({}, this.$props, {dense: true})
        }
      )]
    )
  }
}

export default BaseItemForm
