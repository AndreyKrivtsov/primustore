import { PrimusForm } from '@/primusfront/forms/PrimusForm'
import { CharField, IDField, PositiveIntegerField } from '@/primusfront/forms/fields'

export class ItemForm extends PrimusForm {
  fields () {
    return {
      id: new IDField(),
      name: new CharField('Название товара'),
      count: new PositiveIntegerField('Кол-во товара', {required: true}),
    }
  }
}