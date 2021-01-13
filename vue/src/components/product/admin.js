import { PrimusAdmin } from '../../primusfront/admin/PrimusAdmin'
import { ProductForm } from './ProductForm'
import ProductModel from '../../models/ProductModel'
import { ProductAdapter } from './ProductAdapter'

import BaseListMixin from '../../mixins/BaseListMixin'
import BaseAddMixin from '../../mixins/BaseAddMixin'
import ProductMixin from '../../mixins/ProductMixin'

export class ProductAdmin extends PrimusAdmin {
    AdminApiAdapterClass = ProductAdapter

    constructor() {
        let baseAttrs = {
            form: new ProductForm(),
            componentBaseName: 'Product',
            itemHeader: 'Продукт',
            listHeader: 'Список продуктов',
            basedComponents: {
                'list': { componentName: 'ProductList', mixins: [BaseListMixin, ProductMixin] },
                'add': { componentName: 'ProductAdd', mixins: [BaseAddMixin] }
            }
        }
        super(baseAttrs)
        this.globalSet(ProductModel)
    }
}

export const adminInstance = new ProductAdmin()
