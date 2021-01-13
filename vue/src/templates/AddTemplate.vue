<template>
    <div class="add-template">
        <div class="add-template__title">{{ itemHeader }}</div>
        <base-item-form
            ref="form"
            v-model="valid"
            :form="form"
            :instance="instance"
            :fields="fields"
            :readonly="readonly"
        />
        <button @click="submitHandler()">Сохранить</button>
    </div>
</template>

<script>
export default {
    name: 'ListTemplate',
}
</script>

<style lang="scss">
.add-template {
    margin-top: 30px;

    .add-template__title {
        font-size: 2rem;
        margin-bottom: 30px;
    }
}
</style>