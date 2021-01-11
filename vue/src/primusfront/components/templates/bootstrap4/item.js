export const Bootstrap4ItemTemplate = `<div :class="componentClassName">
  <form v-if="!loading" v-on:submit.prevent @reset="resetHandler">
    <component v-for="key in formKeys" v-bind:key="key" v-bind:is="form[key].widget" :field=form[key] :name= "key" :choices="form[key].choices" v-model="instance[key]"></component>
    <div v-if="!deleteConfirmation">
      <button class="btn btn-dark" v-if="instance.id" @click="saveHandler">Сохранить</button>
      <button class="btn btn-dark" v-if="instance.id" @click="prepDeleteHandler">Удалить</button>
      <button class="btn btn-dark" v-if="!instance.id" @click="createHandler">Создать</button>
    </div>
    <div v-if="deleteConfirmation">
      <button class="btn btn-dark" v-if="instance.id" @click="deleteHandler">Подтверждаю</button>
      <button class="btn btn-dark" v-if="instance.id" @click="dropDeleteHandler">Отмен</button>
    </div>
  </form>
  <div v-if="loading">Подгружаюсь</div>
</div>`

export default Bootstrap4ItemTemplate
