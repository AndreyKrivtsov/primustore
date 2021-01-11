<template>
  <b-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <b-col cols="3"><label>{{ field.label }} | {{ fullDT }}</label></b-col>
    <b-col>
      <b-row v-if='field.editable'>
        <b-col>
          <b-form-datepicker :value="date" @input="DateInputHandler" locale="ru-RU" class="mb-2"></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-timepicker :value="time" @input="TimeInputHandler" locale="ru-RU"></b-form-timepicker>
        </b-col>
      </b-row>
      <span v-if='!field.editable'>{{ fullDT }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { BaseDateTimeWidgetMixin } from '../baseDateTimeWidget'

export default {
  name: 'PFBootstrap4DateTimeWidget',
  mixins: [BaseDateTimeWidgetMixin]
}
</script>
<style scoped>
</style>
