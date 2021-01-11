<template>
  <b-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <b-col cols="3"><label>{{ field.label }}</label></b-col>
    <b-col>
      <b-form-timepicker :value="value" @input="inputHandler" locale="ru-RU"></b-form-timepicker>
      <span v-if='!field.editable'>{{ value }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFBootstrap4TimeWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
