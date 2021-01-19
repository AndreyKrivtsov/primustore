import { PrimusForm } from '@/primusfront/forms/PrimusForm'
import { CharField, IDField, PositiveIntegerField } from '@/primusfront/forms/fields'

export class ProductForm extends PrimusForm {
    fields() {
        return {
            id: new IDField(),
            categoryId: new CharField(),
            name: new CharField('Название товара'),
            cost: new CharField('Стоимость', { required: true }),
            imgUrl: new CharField(),
        }
    }
}