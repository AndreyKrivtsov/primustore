import { ApiAdapter } from '@/primusfront/api/adapter'
import { apolloClient } from '@/plugins/apolloClient'
import { ProductGQLApi } from './ProductGQLApi'

export class ProductAdapter extends ApiAdapter {
  GraphQLApiClass = ProductGQLApi
  constructor (obj) {
    let baseAttrs = {
      apiType: 'apollo',
      connector: apolloClient
    }
    super(Object.assign(baseAttrs, obj))
    this.setCurrentApi()
  }
}