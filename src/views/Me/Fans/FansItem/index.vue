<template>
  <div class="fans-item" v-if="userInfo && isFollowing">
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
            社交ID:{{ userInfo.id }}
          </div>
        </div>
      </div>
      <div class="item-fansButton font_s12 font_w300" style="color:#8e8e8e;" @click="followOrUnfollow">
        <button v-if="isFollowing.length !== 0" class="item-fansButton-btn">
          已关注
        </button>
        <button v-else class="item-fansButton-btn">
          关注
        </button>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
import {follow, getFollowerOrFollowing, unFollow} from "@/assets/api/Social/Follow";
import {useUserStore} from "@/store/userInfo";
const router = useRouter()
const props = defineProps({
  fansUser: {
    type: Object
  }
})
const userInfo = ref()
const userStore = useUserStore()
const isFollowing = ref()
const onFansItem = async () => {
  userInfo.value = await getUserInfoById(props.fansUser!.attentionId)
  const res = await getFollowerOrFollowing({attentionId: userStore.userId, attentionedId: props.fansUser!.attentionId})
  isFollowing.value = res
}

const followOrUnfollow = async () => {
  //已经关注，点击取消关注
  if (isFollowing.value.length !== 0) {
    const res = await unFollow({attentionId: userStore.userId, attentionedId: props.fansUser!.attentionId})
    isFollowing.value.pop()
  } else {
    //未关注，点击关注
    const res = await follow({attentionId: userStore.userId, attentionedId: props.fansUser!.attentionId})
    isFollowing.value.push({
      attentionId: userStore.userId,
      attentionedId: props.fansUser!.attentionId
    })
  }
}

onMounted(() => {
  onFansItem()
})
</script>

<style lang="less" scoped>
.fans-item {
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

    &-fansButton {
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
