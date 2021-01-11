<template>
  <b-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <b-col cols="3"><label>{{ field.label }}</label></b-col>
    <b-col>
      <b-form-datepicker :value="value" @input="inputHandler" locale="ru-RU" class="mb-2"></b-form-datepicker>
      <span v-if='!field.editable'>{{ value }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFBootstrap4DateWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
