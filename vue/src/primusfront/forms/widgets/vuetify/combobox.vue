<template>
  <v-combobox
    :value=val
    @input="inputHandler"
    :items=customChoices
    item-value="value"
    :rules=rules
    :label=field.label
    :disabled="!field.editable"
    outlined
    v-model="select"
  ></v-combobox>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyComboboxWidget',
  mixins: [BaseWidgetMixin],
  data () {
    return {
      select: []
    }
  },
  methods: {
    inputHandler: function (val) {
      this.$emit('input', val)
    }

  },
  computed: {
    customChoices: function () {
      let choices = {}
      if (choices) {
        choices = Object.fromEntries(this.field.choices.all().map(item => [ item[this.field.choicesKeyName], item[this.field.choicesValueName] ]))
      }
      if (this && choices) {
        let data = []
        for (let key in choices) {
          data.push({text: choices[key], value: key})
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
