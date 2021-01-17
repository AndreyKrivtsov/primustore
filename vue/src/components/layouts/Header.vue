<template>
    <div class="header">
        <span class="header__title" @click="goToIndex()">Primustore</span>
        <div class="header-admin"><router-link to="/admin">Панель администратора</router-link></div>
    </div>
</template>

<script>
export default {
    name: 'Header',

    methods: {
        goToIndex() {
            if (this.$route.path == '/') {
                return
            }
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 30px;
    padding-right: 15px;
    background-color: var(--primaryBgColor);
    display: flex;
    z-index: 100;

    .header__title {
        font-size: 1.2rem;
        color: var(--ligthTextColor);
        padding: 4px;
        cursor: pointer;
    }

    .header-admin {
        margin-left: auto;
        margin-right: 15px;
        padding: 5px;
        color: var(--ligthTextColor);

        & > a {
            color: var(--ligthTextColor);

            &:hover {
                color: #AAA;
            }
            &:active {
                color: var(--secondaryTextColor);
            }
        }
    }
}
</style>