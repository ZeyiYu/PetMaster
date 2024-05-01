<template>
  <div class="video-comment">
    <div class="container" v-if="userInfo">
      <div class="avatar">
        <img class="avatar-pic" :src="userInfo.profilePhoto" alt="">
      </div>
      <div class="right">
        <div class="info" v-if="userInfo">
          <div class="info-name font_s16">
            {{ userInfo.nickname }}
          </div>
          <div class="info-time font_s14">
            {{ videoComment.createTime }}
          </div>
        </div>
        <div class="comment font_s16">
          {{ videoComment.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
const props = defineProps({
  videoComment: {
    type: Object
  }
})
onMounted(()=>{
  onVideoComment()
})
const userInfo = ref()
const onVideoComment = async () =>{
  getUserInfoById(props.videoComment!.userId).then(res=>{
    userInfo.value = res
  })
}
</script>

<style lang="less" scoped>
.video-comment {
  padding: 0 10px 15px 10px;
  width: 100%;

  .container {
    display: flex;

    .avatar {
      display: flex;
      z-index: 0;

      &-pic {
        position: relative;
        top: 3px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }

    .right {
      width: 100%;
      margin-left: 10px;

      .info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #989898;

        &-time {
        }
      }

      .comment {
        padding-bottom: 5px;
      }
    }
  }
}
</style>
