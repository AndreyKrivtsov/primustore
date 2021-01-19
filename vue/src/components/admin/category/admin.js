import { PrimusAdmin } from '@/primusfront/admin/PrimusAdmin'
import { CategoryForm } from './CategoryForm'
import { CategoryAdapter } from './CategoryAdapter'
import CategoryModel from '@/models/CategoryModel'

import BaseListComponent from '../template/BaseListComponent'
import BaseListMixin from '@/mixins/BaseListMixin.js'

export class CategoryAdmin extends PrimusAdmin {
    AdminApiAdapterClass = CategoryAdapter
    constructor() {
        let baseAttrs = {
            form: new CategoryForm(),
            componentBaseName: 'Category',
            listHeader: 'Категории',
            basedComponents: {
                'admin': {
                    componentName: 'CategoryAdmin',
                    render: BaseListComponent
                },
            }
        }
        super(baseAttrs)
        this.globalSet(CategoryModel)
    }
}

export const adminInstance = new CategoryAdmin()
