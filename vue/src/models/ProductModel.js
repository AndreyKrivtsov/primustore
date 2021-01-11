import { Model } from '@vuex-orm/core'

export class ProductModel extends Model {
  static entity = 'product'

  static fields () {
    return {
      id: this.uid(),
      name: this.string(''),
      cost: this.number(null),
    }
  }
}

export default ProductModel
