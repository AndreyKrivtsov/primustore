import { PrimusAdmin } from '@/primusfront/admin/PrimusAdmin'
import { CategoryForm } from './CategoryForm'
import { CategoryAdapter } from './CategoryAdapter'
import CategoryModel from '@/models/CategoryModel'

export class CategoryAdmin extends PrimusAdmin {
    AdminApiAdapterClass = CategoryAdapter
    constructor() {
        let baseAttrs = {
            form: new CategoryForm(),
            componentBaseName: 'Category',
        }
        super(baseAttrs)
        this.globalSet(CategoryModel)
    }
}

export const adminInstance = new CategoryAdmin()
