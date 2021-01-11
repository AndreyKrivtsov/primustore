<template>
  <v-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <v-col cols="12">
      <v-textarea
        :label="field.label"
        :value="value"
        @input="inputHandler"
        :placeholder="field.placeholder"
        outlined
        :name="name"
        ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyTextAreaWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
