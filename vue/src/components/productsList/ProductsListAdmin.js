import { PrimusAdmin } from '../../primusfront/admin/PrimusAdmin'
import { PrimusForm } from '../../primusfront/forms/PrimusForm'
import { ProductsListAdapter } from './ProductsListAdapter'
import ProductModel from '../../models/ProductModel'

export class ProductsListAdmin extends PrimusAdmin {
  AdminApiAdapterClass = ProductsListAdapter 
  constructor () {
    let baseAttrs = {
      form: new PrimusForm(),
      componentBaseName: 'ProductsListAdmin'
    }
    super(baseAttrs)
    this.basedComponents = {}
    this.globalSet()
  }
  _setModel () {
    super._setModel(ProductModel)
  }
}

export const adminInstance = new ProductsListAdmin()