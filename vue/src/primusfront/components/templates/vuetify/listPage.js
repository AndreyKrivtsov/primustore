export const VuetifyListPageTemplate = `
<template>
  <div :class="componentClassName">
    <component v-bind:is="adminInstance.basedComponents.list.componentName"></component>
    <component v-bind:is="adminInstance.basedComponents.item.componentName" :id="0"></component>
</div>
</template>
`
export default VuetifyListPageTemplate
