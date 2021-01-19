import { PrimusForm } from '@/primusfront/forms/PrimusForm'
import { CharField, IDField, BoolField } from '@/primusfront/forms/fields'

export class CategoryForm extends PrimusForm {
    fields() {
        return {
            id: new IDField(),
            name: new CharField('Название категории'),
            active: new BoolField(),
        }
    }
}