<template>
  <b-row v-if="field.visible" :class="{'form-group': true, [name]: true}">
    <b-col cols="3"><label>{{ field.label }} </label></b-col>
    <b-col>
      <b-form-select v-if='field.editable' v-bind:value="value" v-on:input="inputHandler">
        <b-form-select-option v-for="(val, key) of choices" v-bind:key="key" v-bind:value="key">{{ val }}</b-form-select-option>
      </b-form-select>
      <span v-if='!field.editable'>{{ choices[value] }}</span>
    </b-col>
  </b-row>
</template>

<script>
import { BaseWidgetMixin } from '../baseWidget'
export default {
  name: 'PFBootstrap4SelectWidget',
  mixins: [BaseWidgetMixin]
}
</script>
<style scoped>
</style>
