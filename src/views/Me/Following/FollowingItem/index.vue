<template>
  <div class="following-item" v-if="userInfo">
    <div class="item">
      <div class="left">
        <div class="item-avatar flex_center_center" @click="router.push({name:'othersPage',params:{userId:userInfo.id}})">
          <img class="item-avatar-pic" :src="userInfo.profilePhoto"/>
        </div>
        <div class="item-info">
          <div class="item-info-top font_s16">
            {{ userInfo.nickname }}
          </div>
          <div class="font_s14 font_w300" style="color: #8e8e8e">
            社交ID:{{ props.followingUser.attentionedId }}
          </div>
        </div>
      </div>
      <div class="item-followButton font_s12 font_w300" style="color:#8e8e8e;">
        <button class="item-followButton-btn" @click="clickUnFollow">
          已关注
        </button>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
import {unFollow} from "@/assets/api/Social/Follow";
import Toast from "@/components/Toast";
const router = useRouter()
const props = defineProps({
  followingUser: {
    type: Object
  }
})
const userInfo = ref()
const onFollowingItem = async () => {
  userInfo.value = await getUserInfoById(props.followingUser!.attentionedId)
}
const clickUnFollow = async () => {
  await unFollow({attentionId: props.followingUser!.attentionId, attentionedId: props.followingUser!.attentionedId})
  userInfo.value = null
  Toast.success('取消关注成功')
}
onMounted(() => {
  onFollowingItem()
})
</script>

<style lang="less" scoped>
.following-item {
  .left {
    display: flex;
    align-items: center;
  }

  .line {
    margin-top: 10px;
    width: 350px;
    height: 1px;
    border: 0.5px solid #eee;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-avatar {
      &-pic {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &-info {
      margin-left: 10px;
    }

    &-followButton {
      &-btn {
        font-size: 14px;
        padding: 3px 15px 3px 15px;
        border-radius: 20px;
        background-color: transparent;
        border: 1px solid #1989fa;
        color: #1989fa;
      }
    }
  }

}
</style>
