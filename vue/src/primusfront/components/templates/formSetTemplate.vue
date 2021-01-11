<template>
  <div>
    <v-row v-for="(item, i ) of val" :key="item.id">
      <v-col>
        <component v-bind:is="fieldComponentName" v-model="ids[i]" @input="changeReference(i)" :comboFieldName="comboFieldName"></component>
        <base-field-set
          v-model="valid"
          :instance="item"
          :fields="formKeys"
          :form="form"
          :readonly="readonly"
          :dense="dense"
        />
      </v-col>
    </v-row>
    <v-btn @click="addItem">Добавить</v-btn>
    <v-list-group :class="`${componentName}__form-summary`" no-action>
      <template v-slot:activator>
        <v-list-item-title>
          <slot name="header">Итого: </slot>
        </v-list-item-title>
      </template>

      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th v-for="key in formKeys" :key="key" class="text-left">{{form[key].label}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in val" :key="item+index">
            <td  v-for="key in formKeys" :key="key">{{item[key]}}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-list-group>

  </div>
</template>

<script>
export default {
  name: 'ComponentFormSetTemplate'
}
</script>
