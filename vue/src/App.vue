<template>
    <div id="app">
        <div>
            <button v-for="tab in tabs" :key="tab.id" @click="showComponent(tab.component)">
                {{ tab.title }}
            </button>
        </div>
        <div>
            <component v-if="activeComponent" v-bind:is="activeComponent.name" v-bind="activeComponent.attrs" @update-item="onUpdate"></component>
        </div>
    </div>
</template>


<script>
import ComponentModel from './models/ComponentModel'

export default {
    name: 'App',

    data() {
        return {
            tabs: [
                { id: 1, title: 'Список продуктов', component: 'ProductList' },
                { id: 2, title: 'Корзина продуктов', component: 'ShoppingCart' },
                { id: 3, title: 'Добавить продукт', component: 'ProductAdd' },
            ],
        }
    },

    computed: {
        activeComponent() {
            return ComponentModel.query().where('active', true).first()
        },
    },

    methods: {
        showComponent(name) {
            if (this.activeComponent) ComponentModel.delete(this.activeComponent.id)

            ComponentModel.insert({
                data: {
                    name,
                    active: true,
                    attrs: { id: 0 }
                },
            })
        },
        onUpdate() {
            console.log('onUpdate in App')
        }
    },

    mounted() {
        this.showComponent('ProductList')
    }
}
</script>


<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
