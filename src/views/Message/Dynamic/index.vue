<template>
  <div class="dynamic">
   <NewItem></NewItem>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";

const active:Ref<number> = ref(1);
</script>

<style lang="less" scoped>
.dynamic {
  padding-top: 15px;
}
</style>
