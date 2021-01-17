import { PrimusAdmin } from '../../primusfront/admin/PrimusAdmin'
import { CategoryForm } from './CategoryForm'
import { CategoryAdapter } from './CategoryAdapter'
import CategoryModel from '../../models/CategoryModel'

import BaseListMixin from '../../mixins/BaseListMixin'
import ShoppingCardMixin from '../../mixins/ShoppingCardMixin'

export class CategoryAdmin extends PrimusAdmin {
    AdminApiAdapterClass = CategoryAdapter
    constructor() {
        let baseAttrs = {
            form: new CategoryForm(),
            componentBaseName: 'Category',
            listHeader: 'Корзина',
            basedComponents: {
                'add': { componentName: 'CategoryAdd', mixins: [BaseListMixin, ShoppingCardMixin] },
            }
        }
        super(baseAttrs)
        this.globalSet(CategoryModel)
    }
}

export const adminInstance = new CategoryAdmin()
