// import axios from 'axios'
import { listFields } from '../forms/PrimusForm'
import { VuetifyListTemplate } from './templates'
import { getComponentConfig } from '../utils/config'
import _ from 'lodash'

export const BaseListMixin = {
  template: VuetifyListTemplate,
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    header: function () {
      return this.adminInstance.listHeader
    },
    componentClassName: function () {
      let className = _.kebabCase(this.adminInstance.basedComponents.list.componentName)
      return {[`${className}`]: true}
    },
    Model: function () {
      return this.adminInstance.Model
    },
    form: function () {
      return this.adminInstance.form
    },
    instances: function () {
      return this.Model.query().orderBy('id').get()
    },
    rowsPerPage: function () {
      return getComponentConfig('PFListPage', 'rowsPerPage')
    },
    formKeys: function () {
      if (listFields.length > 0) {
        return listFields
      }
      return this.form.getVisibleKeys()
    },
    headers: function () {
      let data = this.form.getVisibleKeyFieldPairs().map(([key, field]) => { return {text: field.label, value: key} })
      data.push({ text: '', value: 'actions', sortable: false })
      return data
    },
    // некоторые поля надо причесать, к примеру пол: 'man' поменять на 'мужской' (вызов prettify)
    // скорее всего нужен рефактор
    preparedItems: function () {
      let data = []
      if (this && this.form) {
        for (let instance of this.instances) {
          let obj = Object.assign({}, instance)
          for (let key of this.formKeys) {
            let fld = this.form[key]
            let val = instance[key]
            if (fld) {
              obj[key] = fld.prettify(val)
            } else {
              obj[key] = instance[key]
            }
          }
          data.push(obj)
        }
      }
      return data
    }
  },
  methods: {
    getItems: async function () {
      this.loading = true
      try {
        let items = await this.adminInstance.ormMapper.getOrmList()
        this.$emit('getItems', items)
      } catch (error) {
        throw (error)
      } finally {
        this.loading = false
      }
    },
    onMounted: function () {
      this.getItems().then(() => {})
    }
  },
  mounted () {
    this.onMounted()
  }
}
export default BaseListMixin
