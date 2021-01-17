<template>
    <div class="product-list">
        <div class="product-list__items">
            <template v-if="filteredProducts.length">
                <div
                    class="product-list__item"
                    v-for="product in filteredProducts"
                    :key="product.id"
                >
                    <div class="product-list__item-image-wrapper">
                        <img
                            class="product-list__item__image"
                            v-if="product.imgUrl"
                            :src="product.imgUrl"
                        />
                    </div>
                    <div class="product-list__item-content">
                        <div class="product-list__item-content__cost">{{ product.cost }} P</div>
                        <div class="product-list__item-content__name">{{ product.name }}</div>
                    </div>

                    <div class="product-list__item__button">
                        <PButton @click="addToShoppingCard(product)">Добавить в корзину</PButton>
                    </div>
                </div>
            </template>
            <template v-else> Товары в данной категории отсутствуют </template>
        </div>
    </div>
</template>

<script>
import { adminInstance } from './admin'
import ShoppingCardModel from '../../models/ShoppingCardModel'
import PButton from '../ui/PButton'

/*
    interface IItem{
        id: number;
        categoryId: number;
        name: string;
        cost: number;
    }
*/

export default {
    name: 'ProductList',

    components: { PButton },

    props: {
        activeCategory: String,
    },

    data() {
        return {
            items: [], // type: IItem[]
        }
    },

    computed: {
        listHeader() {
            return adminInstance.listHeader
        },
        filteredProducts() {
            if (typeof this.activeCategory === 'string')
                return adminInstance.Model.query().where('categoryId', this.activeCategory).get()
            else return adminInstance.Model.all()
        },
    },

    methods: {
        addToShoppingCard(product) {
            ShoppingCardModel.insert({
                data: { productId: product.id, name: product.name, cost: product.cost },
            })
        },
    },

    async mounted() {
        await adminInstance.ormMapper.getOrmList().then((items) => {
            this.items = items
        })
    },
}
</script>

<style lang="scss" scoped>
.product-list {
    .product-list__title {
        font-size: 2rem;
        margin-bottom: 30px;
    }

    .product-list__items {
        margin: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        .product-list__item {
            position: relative;
            width: 200px;
            height: 360px;
            margin: 20px;
            border: 1px solid var(--ligthBorderColor);
            border-radius: 0.5rem;
            overflow: hidden;

            .product-list__item-image-wrapper {
                width: 100%;
                height: auto;

                .product-list__item__image {
                    width: 100%;
                    height: auto;
                }
            }

            .product-list__item-content {
                .product-list__item-content__cost {
                    margin-top: 10px;
                }

                .product-list__item-content__name {
                    margin-top: 10px;
                    color: #999;
                }
            }

            .product-list__item__button {
                position: absolute;
                bottom: 10px;
                left: 0;
                width: 100%;
            }
        }
    }
}
</style>