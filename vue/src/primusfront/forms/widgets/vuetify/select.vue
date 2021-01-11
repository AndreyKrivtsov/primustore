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
  ></v-select>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifySelectWidget',
  mixins: [BaseWidgetMixin],
  computed: {
    customChoices: function () {
      if (this && this.choices) {
        let data = []
        for (let key in this.choices) {
          let val = this.choices[key]
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
