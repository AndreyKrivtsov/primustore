export const VuetifyListTemplate = `
<div :class='componentClassName'>
<v-data-table
  :items="preparedItems"
  :headers="headers"
  :items-per-page="rowsPerPage"
  :loading="loading"
>
<template v-slot:top>
  <v-toolbar-title>{{ header }}</v-toolbar-title>
  <v-divider
    class="mx-4"
    inset
    vertical
  ></v-divider>
  <v-spacer></v-spacer>
</template>
<template v-slot:item.actions="{ item }">
  <v-btn small :to="_to(item)" color="primary">
      редактировать
  </v-btn>
</template>
</v-data-table>
</div>`
export default VuetifyListTemplate
