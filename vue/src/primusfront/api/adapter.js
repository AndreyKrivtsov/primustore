import {BaseGraphQLApi} from './GraphQLApi'
import {BaseRESTApi} from '@/primusfront/api/RestApi'
import {BaseApi} from '@/primusfront/api/BaseApi'
import {getComponentConfig} from '../utils/config'
import {assign} from '@/primusfront/utils/object'

export class ApiAdapter extends BaseApi {
  GraphQLApiClass = BaseGraphQLApi
  RESTApiClass = BaseRESTApi
  constructor (
    {
      suffixAttrs, // суффиксы для rest
      objectName, // Название компонента как правило фигурирует и в API
      form, // форма, по который мы можем воссоздать правильные запросы
      appendLatestSlash = true, apiType = 'axios', connector = null, listSuffix = null } = {}) {
    super()
    let defaultFieldArgs = {suffixAttrs, objectName, form, appendLatestSlash, apiType, connector, listSuffix}
    let fullArgs = assign({}, defaultFieldArgs, arguments[0])
    Object.keys(fullArgs).forEach(key => { this[key] = fullArgs[key] })

    this.limit = getComponentConfig('API', 'getListLimit') || null
    this.setCurrentApi()
  }
  setCurrentApi () {
    if (this.apiType === 'apollo') {
      this.currentApi = new this.GraphQLApiClass(this)
    } else {
      this.currentApi = new this.RESTApiClass(this)
    }
  }
  getApiItem (id) {
    return this.currentApi.getApiItem(id)
  }
  getApiList (limit = null, offset = null) {
    if (!limit) { limit = this.limit }
    return this.currentApi.getApiList(limit, offset)
  }
  updateApiItem (obj) {
    return this.currentApi.updateApiItem(obj)
  }
  createApiItem (obj) {
    return this.currentApi.createApiItem(obj)
  }
  deleteApiItem (id) {
    return this.currentApi.deleteApiItem(id)
  }
}
