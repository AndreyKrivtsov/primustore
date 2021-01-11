import axios from 'axios'
import Instance from '../models/Blank'
import { errorHandler } from './utils'

// mixin предназначен для работы с api для списка объектов.

export const ApiListMixin = {
  data () {
    return {
      Model: Instance,
      cached: false,
      api_suffix: '',
      verbose: '_change_name_',
      loading: true,
      errored: false,
      deleteConfirmation: false
    }
  },
  computed: {
    itemComponentName: function () {
      return this.$options.name.replace('List', '').replace('list', '')
    },
    itemPageName: function () {
      let name = this.itemComponentName
      return `${name}ItemPage`
    },
    instances: function () {
      return this.Model.query().orderBy('id').get()
    },
    baseClassName: function () {
      let className = `${this.$options.name}`
      className = className.toLowerCase()
      return {[`${className}`]: true}
    }
  },
  methods: {
    getItems: async function () {
      this.loading = true
      let url = this._formGetUrl()
      let inst = this.Model.all() || null
      if ((!this.cached || !inst) && url !== '') {
        try {
          let data = await this._getApiItems(url)
          this.Model.create({data})
        } catch (error) {
          console.log('get Item error', error)
          this.error = false
        } finally {
          this.loading = false
        }
      }
    },
    _getItemPageParams: function (instance) {
      return {id: instance.id}
    },
    _to: function (instance) {
      return {name: this.itemPageName, params: this._getItemPageParams(instance)}
    },
    _getItemComponentProps (instance) {
      return {id: instance.id}
    },
    _getNewItemComponentProps () {
      return {id: 0}
    },
    getHref (instance) {
      return this.$router.resolve(this._to(instance)).href
    },
    _formGetUrl: function () {
      return `${this.api_suffix}`
    },
    _getApiItems: async function (url) {
      try {
        let fetch = await axios(url)
        console.log('api list fetched', this.$options.name, url)
        return (fetch.data)
      } catch (error) {
        this.errored = true
        this._errorHandler(error, 'get', url)
        throw (error)
      } finally {
        this.loading = true
      }
    },
    _errorHandler: function (error, type, url = null) {
      errorHandler(error, type, this.$options.name, url)
    }

  }
}
export default ApiListMixin
