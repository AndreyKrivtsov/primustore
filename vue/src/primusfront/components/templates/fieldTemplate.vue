<template>
  <v-select
    :value=val
    @input="inputHandler"
    :items=customChoices
    item-value="value"
    item-text="text"
    :label=adminInstance.itemHeader
    dense
    outlined
  ></v-select>
</template>
<script>
export default {
  name: 'ComponentFieldTemplate'
}
</script>
