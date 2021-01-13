import { Model } from '@vuex-orm/core'
import ProductModel from './ProductModel'

export class ShoppingCardModel extends Model {
    static entity = 'shoppingcard'

    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            cost: this.number(null),
        }
    }
}

export default ShoppingCardModel
