<template>
  <v-select
    :value=val
    @input="inputHandler"
    :items=customChoices
    item-value="value"
    item-text="text"
    :rules=rules
    :label=field.label
    :disabled="!field.editable"
    :multiple=true
    outlined
    :name="name"
  ></v-select>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyMultipleFieldWidget',
  mixins: [BaseWidgetMixin],
  data: () => {
    return {
      some: []
    }
  },
  methods: {
    inputHandler: function (val) {
      // val = List['id']
      this.$emit('input', this.field.choices.findIn(val))
    }
  },
  computed: {
    val: function () {
      if (Array.isArray(this.value)) {
        return this.value.map(item => item.id || item)
      }
      if (this.value || this.value === 0) { return `${this.value}` }
      if (this.hasFieldObject && this.field.defaultValue !== null) {
        this.inputHandler(this.field.defaultValue)
        return `${this.field.defaultValue}`
      }
      return null
    },

    customChoices: function () {
      // this.field.choices is VuexORM model
      let choices = {}
      if (choices) {
        choices = Object.fromEntries(this.field.choices.all().map(item => [ item[this.field.choicesKeyName], item[this.field.choicesValueName] ]))
      }
      if (this && choices) {
        let data = []
        for (let key in choices) {
          let val = choices[key]
          let k = key
          data.push({text: val, value: k})
        }
        return data
      } else {
        return []
      }
    }
  }
}
</script>
<style scoped>
</style>
