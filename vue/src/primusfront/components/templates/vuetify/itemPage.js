export const VuetifyItemPageTemplate = `
<template>
  <div :class="componentClassName">
    <component v-bind:is="adminInstance.basedComponents.item.componentName" :id="id"></component>
</div>
</template>
`
export default VuetifyItemPageTemplate
