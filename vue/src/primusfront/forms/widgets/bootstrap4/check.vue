<template>
  <b-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <b-col cols="3"><label>{{ field.label }}</label></b-col>
    <b-col>
      <b-form-checkbox v-if='field.editable' type="text" v-bind:value="value" :unchecked-value="false" v-on:input="inputHandler" :placeholder="field.placeholder" />
      <span v-if='!field.editable'>{{ value }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFBootstrap4CheckWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
