import VuetifyItemPageTemplate from './templates/vuetify/itemPage'

export const BaseItemPageMixin = {
  template: VuetifyItemPageTemplate,
  data () {
    return {
      id: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.id = parseInt(to.params.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.id = parseInt(to.params.id)
  }
}

export default BaseItemPageMixin
