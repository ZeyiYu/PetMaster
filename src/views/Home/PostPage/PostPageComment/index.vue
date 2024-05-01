<template>
  <div class="explore-eachPost-comment">
    <div class="container" v-if="userInfo">
      <div class="avatar">
        <img class="avatar-pic" :src="userInfo.profilePhoto" alt="">
      </div>
      <div class="right">
        <div class="info">
          <div class="info-name font_s14 font_w300">
            {{ userInfo.nickname }}
          </div>
          <div class="info-time font_s12 font_w300">
            {{ postComment.createTime }}
          </div>
        </div>
        <div class="comment font_s14 font_w300">
          {{ postComment.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";

const props = defineProps({
  postComment: {
    type: Object,
  }
})
const userInfo = ref()
const onPostPageComment = async () => {
  userInfo.value = await getUserInfoById(props.postComment!.userId)
}
onMounted(() => {
  onPostPageComment()
})
</script>

<style lang="less" scoped>
.explore-eachPost-comment {
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
        object-fit: cover;
      }
    }

    .right {
      width: 100%;
      margin: 3px 0 0 10px;

      .info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #989898;
        align-items: center;

        &-time {
        }
      }

      .comment {
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
