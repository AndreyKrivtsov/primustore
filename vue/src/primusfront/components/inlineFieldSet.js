import { PrimusForm } from '@/primusfront/forms/PrimusForm'

export const InlineFieldSet = {
  name: 'InlineFieldSet',
  props: {
    form: PrimusForm,
    instance: Object,
    fields: {
      type: Array, // Array[String]
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formKeys () {
      return this.form.getVisibleKeys()
    }
  },
  methods: {
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
          'div',
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
    const formFields = this.$scopedSlots.default
      ? this.$scopedSlots.default({ content: this.renderFormFields(h) })
      : this.renderFormFields(h)

    return h(
      'div',
      {
      },
      [formFields]
    )
  }
}

export default InlineFieldSet
