<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      max-width="290"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="computedDateFormattedMomentjs"
        clearable
        :label="field.label"
        :error-messages="field.transErrors"
        readonly
        :rules=rules
        v-bind="attrs"
        v-on="on"
        @click:clear="clearHandler"
        outlined
        dense
        :placeholder=field.placeholder
        :name="name"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="value"
      @change="dateChangeHandler"
      :label="field.label"
      :disabled="disabled"
      locale="ru-RU"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import moment from 'moment'

import { BaseWidgetMixin } from '../baseWidget'

export default {
  name: 'PFVuetifyDateWidget',
  mixins: [BaseWidgetMixin],
  data: function () {
    return {
      menu: false
    }
  },
  computed: {
    computedDateFormattedMomentjs () {
      if (this.value === 'null') {
        return ''
      }
      return this.value ? moment(this.value).format('dddd, Do MMMM YYYY') : ''
    }
  },
  methods: {
    clearHandler: function () {
      this.$emit('input', '')
    },
    dateChangeHandler: function (val) {
      this.menu = false
      this.inputHandler(val)
    }
  }
}
</script>
<style scoped>
</style>
