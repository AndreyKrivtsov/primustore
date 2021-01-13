import { BaseGraphQLApi, mapModelFields } from '../../primusfront/api/GraphQLApi'
import ProductModel from '../../models/ProductModel'

export class ShoppingCardGQLApi extends BaseGraphQLApi {
    constructor(obj) {
        obj.objectName = 'shoppingCard'
        super(obj)
    }

    _formObjectNameForGetList() {
        return `${this.listSuffix}`
    }
}
