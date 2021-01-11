export const VuetifyItemTemplate = `
<div :class="componentClassName">
  <div>{{ header }}</div>
  <base-item-form
    ref="form"
    v-model="valid"
    :form="form"
    :instance="instance"
    :fields="fields"
    :readonly="readonly"
    :dense="dense"
  />
  <div v-if="!readonly">
    <div v-if="!deleteConfirmation">
      <v-btn color="primary" v-if="instance.id" :disabled="!valid" @click="saveHandler">Сохранить</v-btn>
      <v-btn color="error" v-if="instance.id" @click="prepDeleteHandler">Удалить</v-btn>
      <v-btn color="primary" v-if="!instance.id" :disabled="!valid" @click="createHandler">Создать</v-btn>
    </div>
    <div v-if="deleteConfirmation">
      <v-btn flat color="error" v-if="instance.id" @click="deleteHandler">Подтверждаю</v-btn>
      <v-btn flat v-if="instance.id" @click="dropDeleteHandler">Отмена</v-btn>
    </div>
  </div>
</div>
`

export default VuetifyItemTemplate
