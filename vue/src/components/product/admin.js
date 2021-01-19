import { PrimusAdmin } from '@/primusfront/admin/PrimusAdmin'
import { PrimusForm } from '@/primusfront/forms/PrimusForm'
import ProductModel from '@/models/ProductModel'
import { ProductAdapter } from './ProductAdapter'

export class ProductAdmin extends PrimusAdmin {
    AdminApiAdapterClass = ProductAdapter

    constructor() {
        let baseAttrs = {
            form: new PrimusForm(),
            componentBaseName: 'Product',
        }
        super(baseAttrs)
        this.globalSet(ProductModel)
    }
}

export const adminInstance = new ProductAdmin()
