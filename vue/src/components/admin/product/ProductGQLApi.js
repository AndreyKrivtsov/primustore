import { BaseGraphQLApi, mapModelFields } from '@/primusfront/api/GraphQLApi'
import ProductModel from '@/models/ProductModel'

export class ProductGQLApi extends BaseGraphQLApi {
    constructor(obj) {
        obj.objectName = 'product'
        super(obj)
    }

    _formObjectNameForGetList() {
        return `${this.listSuffix}`
    }

    _prepareResponseObjectForGetList() {
        return mapModelFields(ProductModel.fields(), [])
    }
}
