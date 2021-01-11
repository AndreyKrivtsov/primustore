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
    outlined
    :name="name"
  ></v-select>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyFKFieldWidget',
  mixins: [BaseWidgetMixin],
  computed: {
    customChoices: function () {
      let choices = {}
      if (choices) {
        choices = Object.fromEntries(this.field.choices.all().map(item => [ item[this.field.choicesKeyName], item[this.field.choicesValueName] ]))
      }
      if (this && choices) {
        let data = []
        for (let key in choices) {
          let val = choices[key]
          data.push({text: val, value: key})
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
