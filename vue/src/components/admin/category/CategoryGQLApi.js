import { BaseGraphQLApi, mapModelFields } from '@/primusfront/api/GraphQLApi'

export class CategoryGQLApi extends BaseGraphQLApi {
    constructor(obj) {
        obj.objectName = 'category'
        super(obj)
    }

    _formObjectNameForGetList() {
        return `${this.listSuffix}`
    }
}
