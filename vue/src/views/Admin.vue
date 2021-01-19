<template>
    <div class="admin">
        <div class="admin-menu">
            <div v-for="component in components" :key="component.id">
                <a href="" @click.prevent="showComponent(component.id)">{{ component.header }}</a>
            </div>
        </div>
        <!-- <div class="admin-list">
            <component :is="activeComponent.name"></component>
        </div> -->

        <CategoryAdmin></CategoryAdmin>
    </div>
</template>

<script>
import ComponentModel from '../models/ComponentModel'

export default {
    name: 'Admin',

    components: {},

    computed: {
        components() {
            return ComponentModel.all()
        },
        activeComponent() {
            return ComponentModel.query().where('active', true).first() || { name: '' }
        },
    },

    methods: {
        showComponent(componentId) {
            ComponentModel.update({
                where: (user) => { return user.active === true },
                data: { active: false },
            })

            ComponentModel.update({
                where: componentId,
                data: { active: true },
            })
            //console.log(ComponentModel.all())
        },
    },
}
</script>

<style lang="scss" scoped>
.admin {
    display: flex;

    .admin-menu {
        width: 300px;
        border-right: 1px solid var(--primaryBorderColor);
    }

    .admin-list {
        width: 100%;
    }
}
</style>