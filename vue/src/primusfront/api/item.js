// mixin предназначен для работы с api для одного объекта.

export const ApiItemMixin = {
    data() {
        return {
            instance: {},
            loading: true
        }
    },
    props: {
        id: [Number, String]
    },
    watch: {
        id() {
            this.getItem(this.id)
        }
    },
    computed: {
        ormMapper: function () {
            return this.adminInstance.ormMapper
        },
        Model: function () {
            return this.adminInstance.Model
        }
    },
    methods: {
        getItem: async function (id) {
            // создаем клон объекта к this.instance
            this.loading = true
            try {
                this.instance = await this.ormMapper.getOrmItem(id)
                this.$emit('getItem', this.instance)
            } catch (error) {
                this.instance = { id: 0 }
                throw (error)
            } finally {
                this.loading = false
            }
        },
        updateItem: function () {
            if (!this.loading) {
                try {
                    this.loading = true
                    this.ormMapper.updateOrmItem(this.instance).then(instance => {
                        this.instance = instance
                    })
                    this.$emit('updateItem', this.instance)
                } catch (error) {
                    throw (error)
                } finally {
                    this.loading = false
                }
            }
        },
        createItem: function () {
            try {
                this.loading = true
                this.ormMapper.createOrmItem(this.instance).then(instance => {
                    this.instance = instance
                })
                this.$emit('create', this.instance)
            } catch (error) {
                throw (error)
            } finally {
                this.loading = false
            }
        },
        deleteItem: async function () {
            // функция удаляет объект
            let id = this.instance.id
            this.loading = true
            try {
                await this.ormMapper.deleteOrmItem(id)
                this.$emit('delete', this.instance)
            } catch (error) {
                throw (error)
            } finally {
                this.loading = false
            }
        }
    }
}

export default ApiItemMixin
