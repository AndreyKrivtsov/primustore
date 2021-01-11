<template>
  <component v-bind:is="field.forwardComponent.name" v-bind=forwardAttrs @input="inputHandler"></component>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFVuetifyForwardWidget',
  mixins: [BaseWidgetMixin],
  computed: {
    forwardAttrs: function () {
      return Object.assign({}, this.field.forwardComponent.attrs, this.$attrs, this.$props)
    }
  },
  methods: {
    inputHandler (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped>
</style>
