<template>
    <span :class="className" :style="style"></span>
  </template>
  
<script setup lang="ts">
const props = defineProps({
  size: {
    type: [Number, String],
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
});
const style = computed(() => {
  return {
    fontSize: `${props.size}px`,
    color: props.color
  }
})
const className = computed(() => {
  return `iconfont icon-${props.name}`
})
</script>
<style scoped lang="less"></style>
  