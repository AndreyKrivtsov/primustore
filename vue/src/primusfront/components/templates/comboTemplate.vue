<template>
  <v-combobox
    :value=val
    @input="inputHandler"
    :items=customChoices
    item-value="value"
    item-text="text"
    :label=adminInstance.itemHeader
    dense
    outlined
  ></v-combobox>
</template>
<script>
export default {
  name: 'ComponentFieldTemplate'
}
</script>
