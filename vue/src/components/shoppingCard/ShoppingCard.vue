<template>
    <div class="shopping-card">
        <div class="shopping-card__title">Корзина</div>
        <div class="shopping-card__items">
            <template v-if="list.length">
                <div class="shopping-card__item" v-for="product in list" :key="product.id">
                    <div class="shopping-card__item_left">{{ product.name }}</div>
                    <div class="shopping-card__item_rigth">{{ product.cost }} Р</div>
                    <div class="shopping-card__item_rigth"><PButton @click="deleteItem(product.id)">X</PButton></div>
                </div>
            </template>
            <template v-else>Корзина пуста</template>
        </div>
        <div class="shopping-card__total">Итого: {{ totalCost }} Р</div>
    </div>
</template>

<script>
import ShoppingCardModel from '../../models/ShoppingCardModel'
import PButton from '../ui/PButton'

export default {
    name: 'ShoppingCard',

    components: {
        PButton,
    },

    computed: {
        list() {
            return ShoppingCardModel.all()
        },
        totalCost() {
            let totalCost = 0
            this.list.forEach((product) => {
                totalCost += product.cost
            })
            return totalCost
        },
    },

    methods: {
        deleteItem(productId) {
            ShoppingCardModel.delete(productId)
        },
    },
}
</script>

<style lang="scss" scoped>
.shopping-card {
    padding: 0 30px;
    height: calc(100vh - 100px);
    overflow: auto;

    .shopping-card__title {
        font-size: 2rem;
        margin-bottom: 30px;
    }

    .shopping-card__items {
        .shopping-card__item {
            display: grid;
            grid-template-columns: auto auto 100px;
            padding: 5px 0;
            border-bottom: 1px solid var(--primaryBorderColor);

            .shopping-card__item_left {
                line-height: 2rem;
                text-align: start;
                vertical-align: bottom;
            }

            .shopping-card__item_rigth {
                line-height: 2rem;
                text-align: end;
                vertical-align: baseline;
            }
        }
    }

    .shopping-card__total {
        margin-top: 50px;
        font-weight: bold;
        color: var(--secondaryTextColor);
    }
}
</style>