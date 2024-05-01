<template>
  <div class="c-toast">
    <div class="c-toast-value" :class="status">{{ message }}</div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ToastTemplate',
  props: {
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 2000
    }
  }
})
</script>
<style lang="less" scoped>
.c-toast {
  z-index: 101;
  position: fixed;
  top: 161px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.25s;

  &-value {
    background: #fff;
    font-size: 14px;
    border-radius: 100px;
    text-align: center;
    box-shadow: 0 0px 14px 0 rgba(0, 0, 0, 0.1);
    animation: anim 0.5s;
    padding: 10px 35px;

    &.success {
      color: #1989fa;
    }

    &.error {
      color: #ed2c3e;
    }

    &.warning {
      color: #ffac2f;
    }
  }
}

@keyframes anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.c-toast-value.reomve {
  animation: reomve 0.5s forwards;
}

@keyframes reomve {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
