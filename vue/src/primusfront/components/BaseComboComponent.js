import { BaseWidgetMixin } from '@/primusfront/forms/widgets/baseWidget'
import {isObject} from '@/primusfront/utils/object'
import BaseListMixin from '@/primusfront/components/baseList'

export const BaseComboComponentMixin = {
  render: require('./templates/comboTemplate').default.render,
  mixins: [BaseListMixin, BaseWidgetMixin],
  props: {
    comboFieldName: {
      type: String,
      default: 'name'
    }
  },
  computed: {
    customChoices: function () {
      return this.Model.all().map(item => { return { value: `${item.id}`, text: item[this.comboFieldName] } })
    },
    choicesText: function () {
      let obj = {}
      this.customChoices.forEach(i => { obj[i.text.toLowerCase()] = i })
      return obj
    }
  },
  methods: {
    inputHandler: function (val) {
      let data = val
      if (!isObject(val)) {
        data = this.choicesText[val.toLowerCase()] || val
      }
      this.$emit('input', data)
    }
  }
}
export default BaseComboComponentMixin
