import { Model } from '@vuex-orm/core'

export class ComponentModel extends Model {
  static entity = 'component'
  static fields () {
    return {
      id: this.uid(),
      header: this.attr('Компонент'),
      name: this.string(),
      attrs: this.attr({}),
      active: this.boolean(false),
    }
  }
}

export default ComponentModel
