<template>
  <v-text-field
    outlined
    :label=field.label
    :value=val
    :type=field.type
    :step=field.step
    @input="inputHandler"
    @wheel="$event.target.blur()"
    :rules=rules
    dense
    :required=field.required
    :placeholder=field.placeholder
    :hide-details=hideDetails
    :disabled=disabled
    :name="name"
  ></v-text-field>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyInputWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
