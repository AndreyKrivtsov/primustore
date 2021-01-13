import { BaseItemMixin } from '../primusfront/components/baseItem'

export const BaseAddMixin = {
    name: 'BaseAddMixin',
    mixins: [
        BaseItemMixin,
    ],
    props: {
        militaryUnitId: {
            type: Number | String,
            default: ''
        }
    },
    computed: {
        fields() {
            return BaseItemMixin.computed.fields.call(this)
        },
        itemHeader() {
            return this.adminInstance.itemHeader
        }
    },
    methods: {
        async onMount() {
            if (this.id) {
                this.getItem(this.id).then(() => {
                    this.adminInstance.form.setInstance(this.instance)
                })
            } else {
                this.instance = this.adminInstance.createInitialObject()
                this.adminInstance.form.setInstance(this.instance)
            }
        }

    },
    render: require('../templates/AddTemplate').default.render
}

export default BaseAddMixin
