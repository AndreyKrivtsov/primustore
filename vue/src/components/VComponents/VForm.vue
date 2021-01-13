<template>
    <form>
        <slot />
    </form>
</template>

<script>
export default {
    name: 'VForm',
    props: {
        valid: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        validate() {
            return true
        }
    }
}
</script>