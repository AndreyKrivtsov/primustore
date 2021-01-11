<template>
  <v-checkbox
    v-if='field.editable'
    :label="field.label"
    v-bind:value="value"
    :unchecked-value="false"
    v-on:input="inputHandler"
    :placeholder="field.placeholder"
    :name="name"
  />
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyCheckWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
