<template>
  <v-text-field
    outlined
    :label=field.label
    :value=val
    :type=field.type
    :step=field.step
    @input="inputHandler"
    @keypress="keypressHandler"
    :rules=rules
    dense
    :required=field.required
    :placeholder=field.placeholder
    :hide-details=hideDetails
    :min="minValue"
    :max="field.maxValue"
  ></v-text-field>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyCharFieldWidget',
  mixins: [BaseWidgetMixin],
  methods: {
    inputHandler: function (val) {
      this.$emit('input', String(val))
    }
  }
}
</script>
<style scoped>
</style>
