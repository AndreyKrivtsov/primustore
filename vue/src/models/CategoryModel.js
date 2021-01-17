import { Model } from '@vuex-orm/core'

export class CategoryModel extends Model {
  static entity = 'category'

  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      active: this.boolean(null),
    }
  }
}

export default CategoryModel
