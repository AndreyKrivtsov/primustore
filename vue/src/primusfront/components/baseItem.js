import { ApiItemMixin } from '@/primusfront/api/item'
import { VuetifyItemTemplate } from './templates'
import _ from 'lodash'
import BaseItemForm from '@/primusfront/components/baseItemForm'

// компонент интегрирующий работу с формой
export const BaseItemMixin = {
  components: {BaseItemForm},
  mixins: [ApiItemMixin],
  data () {
    return {
      valid: true,
      deleteConfirmation: false
    }
  },
  template: VuetifyItemTemplate,
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    verboseName: function () {
      return this.adminInstance.itemHeader
    },
    componentClassName: function () {
      let className = _.kebabCase(this.adminInstance.basedComponents.item.componentName)
      return {[`${className}`]: true}
    },
    form: function () {
      return this.adminInstance.form
    },
    fields: function () {
      return this.form.getVisibleKeys()
    },
    formKeys: function () {
      return this.form.getVisibleKeys()
    },
    header: function () {
      let headerType = this.instance.id ? 'редакт.' : 'создание'
      headerType = this.readonly ? 'просмотр' : headerType
      return `${this.verboseName} (${headerType})`
    }
  },
  methods: {
    validateForm: function () {
      if (this.$refs && this.$refs.form) {
        this.$refs.form.validate()
      }
      return this.valid
    },
    saveHandler: function () {
      let id = this.instance.id
      if (id && this.validateForm()) {
        this.updateItem(id)
      }
    },
    submitHandler: function () {
      let id = this.instance.id
      if (id) {
        this.updateItem(id)
      } else {
        this.createItem()
      }
    },
    prepDeleteHandler: function () {
      this.deleteConfirmation = true
    },
    dropDeleteHandler: function () {
      this.deleteConfirmation = false
    },
    deleteHandler: function () {
      let id = this.instance.id
      if (id && this.deleteConfirmation) {
        this.deleteItem(id).then(() => {})
      }
    },
    createHandler: function () {
      let id = this.instance.id
      if (!id && this.validateForm()) {
        this.createItem(this.instance)
      }
    },
    resetHandler: function () {
      this.instance = {}
    },
    onCreated: function () {},
    onMount: async function () {
      if (this.id) {
        await this.getItem(this.id)
        console.log('BI mount', this.instance)
        this.adminInstance.form.setInstance(this.instance)
      } else {
        this.instance = this.adminInstance.createInitialObject()
        this.adminInstance.form.setInstance(this.instance)
      }
    }
  },
  async mounted () {
    await this.onMount()
  }
}

export default BaseItemMixin
