<script setup>
const emit = defineEmits([
    'click'
]);

const props = defineProps({
  btnType: {
    type: String,
    default: 'submit'
  }
})
</script>

<template>
    <button
        @click="emit('click')"
        :type="btnType"
    >
        <slot />
    </button>
</template>

<style scoped lang="scss">
button {
    cursor: pointer;
    background-color: #4d5d5d;
    padding: 5px 10px;
    font-size: 16px;
    border: none;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 600;
    color: white;
}
</style>