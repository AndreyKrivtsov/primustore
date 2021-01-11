import BaseListMixin from './baseList'
import { BaseWidgetMixin } from '@/primusfront/forms/widgets/baseWidget'

export const BaseFieldComponentMixin = {
  render: require('./templates/fieldTemplate').default.render,
  mixins: [BaseListMixin, BaseWidgetMixin],
  computed: {
    customChoices: function () {
      return this.Model.all().map(item => { return { value: `${item.id}`, text: item.name } })
    },
    val: function () {
      if (this.value || this.value === 0) { return `${this.value}` }
      return null
    }
  }
}
export default BaseFieldComponentMixin
