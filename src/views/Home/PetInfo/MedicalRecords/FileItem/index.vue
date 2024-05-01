<template>
  <div class="feature-files-fileItem">
    <div class="file-wrapper">
      <div class="file-wrapper-desc">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <div class="font_s20 font_w500" style="margin-bottom: 5px">Name: Bailey</div>
        </div>
        <div class="font_s16 sub">Age: 4 years</div>
        <div class="font_s16 sub">Breed：Labrador Retriever</div>
        <div class="font_s16 sub">Gender：Male</div>
        <div class="font_s16 sub">Coat Color：Golden</div>
        <div class="font_s16 sub">Eye Color：Brown</div>
        <div class="font_s16 sub">ID Chip: 153235759</div>
        <div class="font_s16 sub">Birthday: May 15th, 2019</div>
        <div class="font_s16 sub">Place Born: Boston, Massachusetts</div>
      </div>
      <div class="file-wrapper-time font_s14">
        Created on March 26th, 2024
      </div>
      <div class="file-wrapper-tag font_s14 flex_center_center">
        Active
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";

import Toast from "@/components/Toast";

const showEditFile: Ref<boolean> = ref(false)
/*const props = defineProps({
  fileContent: {
    type: Object
  }
})*/

</script>

<style lang="less" scoped>
.file-wrapper {
  width: 350px;
  border-radius: 10px;
  border: 1px solid #20aca4;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
  padding: 15px 15px 15px 0;
  margin-bottom: 15px;

  &-desc {
    margin: 0 0 0 20px;

    .sub {
      color: #767676;
      margin-bottom: 3px;
    }
  }

  &-time {
    margin: 20px 0 5px 20px;
  }

  &-tag {
    margin-left: 20px;
    width: 54px;
    height: 23px;
    color: #fff;
    border-radius: 5px;
    background-color: #20aca4;
  }
}
</style>
