<template>
  <v-file-input
    @input="inputHandler"
    @change="inputHandler"
    :color="color"
    counter
    :label="label"
    :placeholder="placeholder"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
    :name="name"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        :color="color"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>
      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2">
        +{{ value.length - 2 }} файл(ы)
      </span>
    </template>
  </v-file-input>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
import { getComponentConfig } from '../../../utils/config'

export default {
  name: 'PFVuetifyFileInputWidget',
  mixins: [BaseWidgetMixin],
  computed: {
    label: function () {
      return getComponentConfig('PFFileInputWidget', 'label') || ''
    },
    color: function () {
      return getComponentConfig('PFFileInputWidget', 'color') || ''
    },
    placeholder: function () {
      return getComponentConfig('PFFileInputWidget', 'placeholder') || ''
    }
  }
}
</script>
<style scoped>
</style>
