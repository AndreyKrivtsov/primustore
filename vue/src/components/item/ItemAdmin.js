import { PrimusAdmin } from '@/primusfront/admin/PrimusAdmin'
import { ItemForm } from '@/components/animal/forms'

export class ItemAdmin extends PrimusAdmin {
  constructor () {
    let baseAttrs = {
      form: new ItemForm(),
      componentBaseName: 'Item',
      itemHeader: 'Продукт',
      listHeader: 'Список продуктов'
    }
    super(baseAttrs)
    this.globalSet()
  }
}

export const adminInstance = new ItemAdmin()
