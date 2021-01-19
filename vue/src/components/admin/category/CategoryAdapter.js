import { ApiAdapter } from '@/primusfront/api/adapter'
import { apolloClient } from '@/plugins/apolloClient'
import { CategoryGQLApi } from './CategoryGQLApi'

export class CategoryAdapter extends ApiAdapter {
  GraphQLApiClass = CategoryGQLApi
  constructor (obj) {
    let baseAttrs = {
      apiType: 'apollo',
      connector: apolloClient
    }
    super(Object.assign(baseAttrs, obj))
    this.setCurrentApi()
  }
}