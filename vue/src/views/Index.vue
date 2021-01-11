<template>
  <div class="index">
    <ProductsList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductsList from '@/components/productsList/ProductsList.vue'

export default {
  name: 'Home',
  components: {
    ProductsList
  }
}
</script>
