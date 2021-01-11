import { ApiAdapter } from '../../primusfront/api/adapter'
import { apolloClient } from '@/plugins/apolloClient'
import { ProductsListGQLApi } from './ProductsListGQLApi'

export class ProductsListAdapter extends ApiAdapter {
  GraphQLApiClass = ProductsListGQLApi
  constructor (obj) {
    let baseAttrs = {
      apiType: 'apollo',
      connector: apolloClient
    }
    super(Object.assign(baseAttrs, obj))
    this.setCurrentApi()
  }
}
