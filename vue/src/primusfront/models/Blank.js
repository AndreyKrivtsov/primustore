import { Model } from '@vuex-orm/core'

export class Blank extends Model {
  static entity = 'blank-components'
  static fields () {
    return {
      id: this.number(null).nullable()
    }
  }
}

export default Blank
