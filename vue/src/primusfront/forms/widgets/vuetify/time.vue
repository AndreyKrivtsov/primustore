<template>
  <v-dialog
      v-model="menu"
      ref="dialog"
      :close-on-content-click="false"
      max-width="290"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="computedTimeFormattedMomentjs"
        clearable
        :label="field.label"
        readonly
        v-bind="attrs"
        v-on="on"
        @click:clear="clearHandler"
        outlined
        dense
        :name="name"
      ></v-text-field>
    </template>
    <v-time-picker
      :value="value"
      full-width
      @change="timeChangeHandler"
      :disabled="disabled"
      locale="ru-RU"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(value)">OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyTimeWidget',
  mixins: [BaseWidgetMixin],
  data: function () {
    return {
      menu: false
    }
  },
  computed: {
    computedTimeFormattedMomentjs () {
      return this.value
    }
  },
  methods: {
    clearHandler: function () {
      this.$emit('input', '')
    },
    timeChangeHandler: function (val) {
      this.menu = false
      this.inputHandler(val)
    }
  }
}
</script>
<style scoped>
</style>
