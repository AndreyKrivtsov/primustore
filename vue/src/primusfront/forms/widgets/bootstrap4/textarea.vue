<template>
  <b-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <b-col cols="3"><label>{{ field.label }}</label></b-col>
    <b-col>
      <b-form-textarea v-if='field.editable' v-bind:value="value" v-on:input="inputHandler" :placeholder="field.placeholder" :rows="field.minValue" :max-rows="field.maxValue" ></b-form-textarea>
      <span v-if='!field.editable'>{{ value }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFBootstrap4TextAreaWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
