import { PrimusAdmin } from '../../primusfront/admin/PrimusAdmin'
import { ProductForm } from '../product/ProductForm'
import { ShoppingCardAdapter } from './ShoppingCardAdapter'
import ShoppingCardModel from '../../models/ShoppingCardModel'

import BaseListMixin from '../../mixins/BaseListMixin'
import ShoppingCardMixin from '../../mixins/ShoppingCardMixin'

export class ShoppingCardAdmin extends PrimusAdmin {
    AdminApiAdapterClass = ShoppingCardAdapter
    constructor() {
        let baseAttrs = {
            form: new ProductForm(),
            componentBaseName: 'shoppingCard',
            listHeader: 'Корзина',
            basedComponents: {
                '': { componentName: 'ShoppingCart', mixins: [BaseListMixin, ShoppingCardMixin] },
            }
        }
        super(baseAttrs)
        this.globalSet(ShoppingCardModel)
    }
}

export const adminInstance = new ShoppingCardAdmin()
