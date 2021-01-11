<template>
  <v-row>
    <v-col>
      <PFVuetifyDateWidget :value="date" @input="DateInputHandler" :field="field" name="date" :choices="{}"></PFVuetifyDateWidget>
    </v-col>
    <v-col>
      <PFVuetifyTimeWidget :value="time" @input="TimeInputHandler" :field="field" name="time" :choices="{}"></PFVuetifyTimeWidget>
    </v-col>
  </v-row>
</template>

<script>
import { BaseDateTimeWidgetMixin } from '../baseDateTimeWidget'

export default {
  name: 'PFVuetifyDateTimeWidget',
  mixins: [BaseDateTimeWidgetMixin]
}
</script>
<style scoped>
</style>
