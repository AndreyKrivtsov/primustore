import {default as axiosDefault} from 'axios'
import { attrsToSuffix } from './tools'
import { BaseApi } from './BaseApi'
import {METHODS, PrimusError} from '@/primusfront/api/utils'

export class BaseRESTApi extends BaseApi {
  excludedFieldsForUpdateOrSave = ['id', '$id']

  constructor ({suffixAttrs, appendLatestSlash, connector} = {suffixAttrs: [], appendLatestSlash: true, connector: axiosDefault}) {
    super()
    // [['military_unit', 1], [''] => /order/ & /order/:id/
    this.suffixAttrs = typeof suffixAttrs === 'string' ? [suffixAttrs] : suffixAttrs
    this.appendLatestSlash = appendLatestSlash
    this.axios = axiosDefault || connector// должен быть connector
  }
  async getApiItem (Id) {
    let url = this._formDetailUrl(Id)
    return this._getApiItem(url)
  }
  async updateApiItem (obj) {
    const { url, data } = this._prepareForUpdate(obj)
    return this._updateApiItem(url, data)
  }
  async createApiItem (obj) {
    const { url, data } = this._prepareForCreate(obj)
    return this._createApiItem(url, data)
  }
  async deleteApiItem (Id) {
    const url = this._prepareForDelete(Id)
    return this._deleteApiItem(url)
  }
  async getApiItems () {
    return this.getApiList()
  }
  async getApiList (limit = null, offset = null) {
    let url = this._formListApiUrl()
    return this._getApiList(url)
  }

  _prepareDataForCreate (data) {
    let preSaveData = Object.create(data)
    this.excludedFieldsForUpdateOrSave.map(i => {
      delete preSaveData[i]
    })
    return data
  }
  _prepareDataForUpdate (data) {
    // предформатирование отправляемых данных
    return this._prepareDataForCreate(data)
  }

  _formCreateApiUrl () {
    return attrsToSuffix(this.suffixAttrs, this.appendLatestSlash)
  }

  _formListApiUrl () {
    return this._formCreateApiUrl()
  }
  _formDetailUrl (DetailId) {
    let suffix = [...this.suffixAttrs]
    suffix.push(DetailId)
    return attrsToSuffix(suffix, this.appendLatestSlash)
  }

  _prepareForUpdate (obj) {
    let url = this._formDetailUrl(obj.id)
    let data = this._prepareDataForUpdate(obj)
    return {url, data}
  }
  _prepareForCreate (obj) {
    let url = this._formCreateApiUrl()
    let data = this._prepareDataForCreate(obj)
    return {url, data}
  }
  _prepareForDelete (id) {
    let url = this._formDetailUrl(id)
    let data = {}
    return {url, data}
  }

  async _callApiWithError (url, obj = null, method, message) { // общий вызов обработчика api и обработка ошибки
    const methods = Object.keys(METHODS).map(k => METHODS[k]).filter(v => v !== METHODS.get)
    if (!(method in methods)) {
      throw new PrimusError({message: `RestApi:  _callApi неопознан метод: ${method}, метод должен быть из списка ${methods}`})
    }
    try {
      let fetch = await this.axios[method](url, obj)
      return fetch.data
    } catch (error) {
      throw new PrimusError({ message, error, data: error.request })
    }
  }

  async _fetchCallApiWithError (url, message) { // вызов api для гет запросов и обработка ошибки
    try {
      let fetch = await this.axios(url)
      return fetch.data
    } catch (error) {
      throw new PrimusError({ message, error, data: error.request })
    }
  }

  async _getApiItem (url = '') {
    return this._fetchCallApiWithError(url, 'RestApi: Ошибка в запросе на получение данных объека')
  }

  async _getApiList (url = '') {
    return this._fetchCallApiWithError(url, 'RestApi: Ошибка в запросе на получение списка данных')
  }

  async _getApiItems (url) {
    return this._getApiList(url)
  }
  async _updateApiItem (url, obj) {
    return this._callApiWithError(url, obj, METHODS.put, 'RestApi: Ошибка в запросе на обновление данных объекта')
  }
  async _createApiItem (url, obj) {
    return this._callApiWithError(url, obj, METHODS.post, 'RestApi: Ошибка в запросе на создание объекта')
  }
  async _deleteApiItem (url) {
    return this._callApiWithError(url, null, METHODS.delete, 'RestApi: Ошибка в запросе на удаление объекта')
  }
}
