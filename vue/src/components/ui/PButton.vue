<template functional>
    <button class="p-button" @click="listeners['click']"><slot /></button>
</template>

<script>
export default {
    name: 'PButton',
}
</script>

<style lang="scss" scoped>
.p-button {
    font-size: 1rem;
    padding: 6px 14px;
    outline: none;
    background-color: var(--primaryButtonBgColor);
    color: var(--primaryButtonTextColor);
    border: 1px solid var(--primaryButtonBorderColor);
    border-radius: 0.2rem;

    &:hover {
        border: 1px solid var(--hoverButtonBorderColor);
    }

    &:active {
        border: 1px solid var(--primaryButtonBorderColor);
    }
}
</style>