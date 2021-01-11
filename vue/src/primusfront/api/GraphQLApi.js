import { BaseApi } from './BaseApi'
import gql from 'graphql-tag'
import _ from 'lodash'
// import { BelongsTo, HasMany } from '@vuex-orm/core'
import vue from '../utils/vue'
import {assign} from '../utils/object'
import {PrimusError} from '@/primusfront/api/utils'
import {BelongsTo, HasMany} from '@vuex-orm/core'

export const mapModelFields = function (fields, ignoreFields) {
  const cache = new Set()

  function map (fields) {
    return Object.entries(fields).filter(field => field).map(([key, value]) => {
      if (ignoreFields && ignoreFields.indexOf(key) !== -1) return
      cache.add(value.model.entity)

      if (value instanceof BelongsTo) {
        if (cache.has(value.parent.entity)) return

        cache.add(value.parent.entity)
        return `${key} {${map(value.parent.fields())}}`
      }

      if (value instanceof HasMany) {
        if (cache.has(value.related.entity)) return

        cache.add(value.related.entity)
        return `${key} {${map(value.related.fields())}}`
      }

      return key
    }).join(', ')
  }

  return map(fields)
}

export class BaseGraphQLApi extends BaseApi {
  constructor (
    {
      objectName, // Название объекта, как правило задается через admin.js (componentBaseName)
      form = null, // инстанс наследника класса PrimusForm, передаётся через admin.js
      connector = vue.$apollo, // коннектор для работы
      listSuffix = null // введено для модификации запроса к списку объекта
    } = {}) {
    super()
    this.pascalCaseObjectName = _.upperFirst(_.camelCase(objectName))
    this.camelCaseObjectName = _.camelCase(objectName)
    this.listSuffix = listSuffix || `${this.camelCaseObjectName}`
    this.fields = form ? form.getKeys() : []
    this.form = form
    this.apollo = connector
    this.excludedFieldsForUpdateOrSave = ['id', '$id']
  }

  async getApiItem (Id) { // верхний метод получения объекта
    let data = await this._getApiItem(Id)
    return this._prepareDataAfterGetItemResponse(data)
  }

  async getApiItems () { // заглушка от старого вариант (устарело)
    return this.getApiList()
  }

  async getApiList (limit = null, offset = null) { // верхний метод для получения списка объектов
    return this._getApiList(limit, offset)
  }

  async updateApiItem (obj) { // верхний метод обновления объекта
    let mutator = this._prepareMutatorForItemUpdate()
    let variables = this._prepareDataForCreate(obj)
    let data = await this._updateApiItem(mutator, variables)
    return this._prepareDataAfterUpdateResponse(data)
  }

  async createApiItem (obj) { // верхний метод создания объекта
    let mutator = this._prepareMutatorForItemCreate(obj)
    let variables = this._prepareDataForUpdate(obj)
    let data = await this._createApiItem(mutator, variables)
    return this._prepareDataAfterCreateResponse(data)
  }

  async deleteApiItem (Id) { // верхний метод удаления объекта
    let mutator = this._prepareMutatorForItemDelete(Id)
    return this._deleteApiItem(mutator, {})
  }

  _formObjectNameForGetItem () { return `${this.camelCaseObjectName}` } // query { <"model">
  _formObjectNameForGetList () { return `${this.listSuffix}List` } // query { <"model"List>
  _formObjectNameForItemCreate () { return `create${this.pascalCaseObjectName}` } // mutation { <create"Model"> (...)
  _formObjectNameForItemUpdate () { return `update${this.pascalCaseObjectName}` } // mutation { <update"Model"> (...)
  _formObjectNameForItemDelete () { return `delete${this.pascalCaseObjectName}` } // mutation { <delete"Model"> (...)

  _formQueryMutatorWithError (data, message) {
    try {
      return gql(data)
    } catch (error) {
      throw new PrimusError({message, data, error})
    }
  }
  _formFieldsForGQL () {
    return this.form.getFields().filter(field => field.preventForModel === false && field.preventForGQL === false)
  }
  _prepareResponseObjectForGetItem () {
    return this._formFieldsForGQL().map(field => field.name).join(', ')
  }
  _prepareQueryForItemFetch (Id) { // готовит query { <componentName> { ...fields } }
    let fields = this._prepareResponseObjectForGetItem()
    let query = `query { ${this._formObjectNameForGetItem()} (id: "${Id}") { ${fields} } }`
    return this._formQueryMutatorWithError(query, 'Проблемы с обработчиком запросов для вызова детелей объекта')
  }
  _prepareResponseObjectForGetList () {
    return this._formFieldsForGQL().map(field => field.name).join(', ')
  }
  _prepareQueryForGetListRequest (limit, offset) { // готовит query { <componentName>List { ...fields } }
    let fields = this._prepareResponseObjectForGetList()
    let fnStr = ''
    if (limit || offset) {
      let str = [limit ? `limit: ${limit}` : '', offset ? `offset: ${offset}` : ''].filter(i => i !== '').join(', ')
      fnStr = `( ${str} )`
    }
    let query = `query { ${this._formObjectNameForGetList()}${fnStr} { ${fields} } }`
    return this._formQueryMutatorWithError(query, 'Проблемы с обработчиком запросов для вызова списка объектов')
  }
  _prepareDataForCreate (data) { // предформатирование отправляемых данных для создания объекта
    let preSaveData = assign({}, data)
    this.excludedFieldsForUpdateOrSave.forEach(field => {
      delete preSaveData[field]
    })
    return data
  }
  _prepareDataForUpdate (data) { // предформатирование отправляемых данных для обновления объекта
    return this._prepareDataForCreate(data)
  }
  _prepareDataAfterGetListResponse (response) { // обрабатываем исходный ответ, он объект в формате { data: { <someName> { } } }
    return response.data[this._formObjectNameForGetList()]
  }
  _prepareDataAfterUpdateResponse (response) { // обрабатываем исходный ответ, он объект в формате { <someName> { } }
    return response[this._formObjectNameForItemUpdate()]
  }
  _prepareDataAfterCreateResponse (response) { // обрабатываем исходный ответ, он объект в формате { <someName> { } }
    return response[this._formObjectNameForItemCreate()]
  }
  _prepareDataAfterGetItemResponse (response) { // обрабатываем исходный ответ, он объект в формате { <someName> { } }
    return response[this._formObjectNameForGetItem()]
  }
  async _getApiList (limit, offset) { // реализация получения списка объектов от API
    let query = this._prepareQueryForGetListRequest(limit, offset)
    try {
      let response = await this.apollo.query({query, fetchPolicy: 'network-only'})
      return this._prepareDataAfterGetListResponse(response)
    } catch (error) {
      throw new PrimusError({message: 'BaseGraphQLApi: Проблема с запросом на получение списка объектов ', error})
    }
  }

  _prepareFieldsForItemUpdate () { // подготавливает поля для обновления объекта
    return this._formFieldsForGQL()
  }
  _prepareUpFnAttrsForItemUpdate () { // подготавливает поля для верхней функции мутатор mutator fn (attr1: String!, attr2: Int!) {
    return this._prepareFieldsForItemUpdate().map(field => `$${field.name}: ${field.toGQLType()}`).join(', ')
  }
  _prepareDownFnAttrsForItemUpdate () { // подготавливает поля для нижней функции fn (attr1: String!, attr2: Int!) { fn { attr1: $attr1, attr2: $attr2 {
    return this._prepareFieldsForItemUpdate().map(field => `${field.name}: $${field.name}`).join(', ')
  }
  _prepareResponseObjectForItemUpdate () { // подготавливает параметры возвращаемого тела
    return this._prepareFieldsForItemUpdate().map(field => field.name).join(', ')
  }
  _prepareMutatorForItemUpdate () { // подготовка мутатора для обновления объекта
    let mutator = `mutation ${this._formObjectNameForItemUpdate()} (${this._prepareUpFnAttrsForItemUpdate()}) {
        ${this._formObjectNameForItemUpdate()} (${this._prepareDownFnAttrsForItemUpdate()}) {
          ${this._prepareResponseObjectForItemUpdate()}
        }
      }`
    return this._formQueryMutatorWithError(mutator, 'BaseGraphQLApi: Проблемы с обработчиком мутаций для обновления объекта')
  }

  _prepareFieldsForItemCreate () { // подготавливает поля для обновления объекта
    return this._formFieldsForGQL()
  }
  _prepareUpFnAttrsForItemCreate () { // подготавливает поля для верхней функции мутатор mutator fn (attr1: String!, attr2: Int!) {
    return this._prepareFieldsForItemCreate().filter(field => field.name !== 'id').map(field => `$${field.name}: ${field.toGQLType()}`).join(', ')
  }
  _prepareDownFnAttrsForItemCreate () { // подготавливает поля для нижней функции fn (attr1: String!, attr2: Int!) { fn { attr1: $attr1, attr2: $attr2 {
    return this._prepareFieldsForItemCreate().filter(field => field.name !== 'id').map(field => `${field.name}: $${field.name}`).join(', ')
  }
  _prepareResponseObjectForItemCreate () { // подготавливает параметры возвращаемого тела
    return this._prepareFieldsForItemCreate().map(field => field.name).join(', ')
  }

  _prepareMutatorForItemCreate () { // подготовка мутатора для создания объекта
    let mutator = `mutation ${this._formObjectNameForItemCreate()} (${this._prepareUpFnAttrsForItemCreate()}) {
        ${this._formObjectNameForItemCreate()} (${this._prepareDownFnAttrsForItemCreate()}) {
          ${this._prepareResponseObjectForItemCreate()}
        }
      }`
    return this._formQueryMutatorWithError(mutator, 'BaseGraphQLApi: Проблемы с обработчиком мутаций для обновления объекта')
  }

  _prepareMutatorForItemDelete (id) { // подготовка мутатора для удаления объека
    let mutator = `mutation { ${this._formObjectNameForItemDelete()} (id: ${id}) { ok } }`
    return this._formQueryMutatorWithError(mutator, 'BaseGraphQLApi: Проблемы с обработчиком мутаций для удаления объекта')
  }

  async _getApiItem (Id) { // реализация получения объект от API
    let query = this._prepareQueryForItemFetch(Id)
    try {
      let fetch = await this.apollo.query({query, fetchPolicy: 'network-only'})
      return fetch.data
    } catch (error) {
      throw new PrimusError({ message: 'BaseGraphQLApi: Проблема с запросом на получение объекта', error, data: { id: Id, errors: error.networkError.result } })
    }
  }

  async _callApiMutation (mutation, variables = {}, message = '') { // Общий вызов мутатора
    try {
      let fetch = await this.apollo.mutate({ mutation, variables })
      return (fetch.data)
    } catch (error) {
      throw new PrimusError({ message, error, data: [error.networkError.result, variables] })
    }
  }

  async _updateApiItem (mutation, variables) { // мутоген для обновления
    return this._callApiMutation(mutation, variables, 'BaseGraphQLApi: Проблема с запросом на обновление объекта')
  }

  async _createApiItem (mutation, variables) {
    return this._callApiMutation(mutation, variables, 'BaseGraphQLApi: Проблема с запросом на создание объекта') // мутоген для создания
  }

  async _deleteApiItem (mutation, variables) {
    return this._callApiMutation(mutation, variables, 'BaseGraphQLApi: Проблема с запросом на удаление объекта') // мутоген для удаления
  }
}
