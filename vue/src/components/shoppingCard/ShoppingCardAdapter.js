import { ApiAdapter } from '../../primusfront/api/adapter'
import { apolloClient } from '@/plugins/apolloClient'
import { ShoppingCardGQLApi } from './ShoppingCardGQLApi'

export class ShoppingCardAdapter extends ApiAdapter {
  GraphQLApiClass = ShoppingCardGQLApi
  constructor (obj) {
    let baseAttrs = {
      apiType: 'apollo',
      connector: apolloClient
    }
    super(Object.assign(baseAttrs, obj))
    this.setCurrentApi()
  }
}