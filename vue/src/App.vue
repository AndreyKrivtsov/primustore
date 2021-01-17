<template>
    <div id="app">
        <Header />
        <div class="app-content">
            <router-view />
        </div>
        <Footer />
    </div>
</template>


<script>
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

export default {
    name: 'App',
    components: {
        Header,
        Footer
    }
}
</script>


<style lang="scss">
#app {
    position: relative;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--primaryTextColor);

    .app-content {
        margin: 30px 0;
    }
}
</style>
