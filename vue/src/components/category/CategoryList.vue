<template>
    <div class="category-list">
        <div
            class="category-list__item"
            :class="{ selected: activeCategory === null }"
            @click="activeCategory = null"
        >
            Все категории
        </div>
        <div
            class="category-list__item"
            :class="{ selected: activeCategory === category.id }"
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
        >
            {{ category.name }}
        </div>
    </div>
</template>

<script>
import { adminInstance } from './admin'

export default {
    name: 'CategoryList',

    props: {
        value: {
            type: String,
            default: null,
        },
    },

    data() {
        return {}
    },

    computed: {
        categories() {
            return adminInstance.Model.all()
        },
        activeCategory: {
            get() {
                return this.value
            },

            set(id) {
                this.categories.forEach(category => {
                    category.id === id ? category.active = true : category.active = false
                });

                this.$emit('input', id)
            },
        },
    },

    watch: {
        value(value) {
            this.activeCategory = value
        },
    },

    async mounted() {
        await adminInstance.ormMapper.getOrmList().then((categories) => {
            this.activeCategory = categories.id
        })
    },
}
</script>

<style lang="scss" scoped>
.category-list {
    .category-list__item {
        display: inline-block;
        width: 15%;
        padding: 20px 10px;
        margin: 5px;
        border: 1px solid var(--primaryBorderColor);
        border-radius: 0.2rem;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 4px #aaa;
        }

        &:active {
            box-shadow: none;
        }

        &.selected {
            background-color: var(--secondaryBgColor);
            color: var(--ligthTextColor);
            border-color: var(--secondaryBgColor);
        }
    }
}

@media screen and (max-width: 1000px) {
    .category-list {
        font-size: 0.8rem;

        .category-list__item {
            padding: 10px 10px;
            width: auto;
        }
    }
}
</style>