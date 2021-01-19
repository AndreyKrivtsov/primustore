import { PrimusAdmin } from '@/primusfront/admin/PrimusAdmin'
import { ProductForm } from './ProductForm'
import ProductModel from '@/models/ProductModel'
import { ProductAdapter } from './ProductAdapter'

import BaseListMixin from '@/mixins/BaseListMixin'

export class ProductAdmin extends PrimusAdmin {
    AdminApiAdapterClass = ProductAdapter

    constructor() {
        let baseAttrs = {
            form: new ProductForm(),
            componentBaseName: 'Product',
            itemHeader: 'Продукты',
            listHeader: 'Продукты',
            basedComponents: {
                'admin': { componentName: 'ProductAdmin', mixins: [BaseListMixin] },
            }
        }
        super(baseAttrs)
        this.globalSet(ProductModel)
    }
}

export const adminInstance = new ProductAdmin()
