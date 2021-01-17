import { Model } from '@vuex-orm/core'

export class ProductModel extends Model {
  static entity = 'product'

  static fields () {
    return {
      id: this.uid(),
      categoryId: this.string(''),
      name: this.string(''),
      cost: this.string(''),
      imgUrl: this.string(''),
    }
  }
}

export default ProductModel
