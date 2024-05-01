<template>
  <div class="square-joinedSquare-item">
    <van-config-provider :theme-vars="themeVars">
      <div class="item">
        <div class="left">
          <div class="avatar flex_center_center">
            <img class="avatar-pic" :src="eachSquare.categoryImage" alt=""/>
          </div>
          <div class="info" @click="router.push({name:'squarePage',params:{categoryId:eachSquare.id}})">
            <div class="info-title font_s14">
              {{ eachSquare.categoryName }}
            </div>
            <div class="info-desc font_s14 font_w300">
              {{ eachSquare.categoryBrief }}
            </div>
            <div class="info-number font_s12 font_w300">
              {{ eachSquare.articleCount }}个帖子 · {{ eachSquare.attentionCount }}人加入
            </div>
          </div>
        </div>
        <div class="join flex_center_center" @click="unJoin">
          <van-button color="#F6F6F6" style="color:#2D6CE0;font-weight: 500;padding: 2px 9px;font-size: 13px">已加入
          </van-button>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {useUserStore} from "@/store/userInfo";
import {unJoinSquare} from "@/assets/api/Social/UserSquare";
import Toast from "@/components/Toast";
import eventBus from "@/utils/eventBus";

const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  buttonDefaultHeight: '30px',
  buttonDefaultColor: '#000',
};
const props = defineProps({
  eachSquare: {
    type: Object
  }
})

//是否加入圈子
const isJoin = ref()
isJoin.value = props.eachSquare!.isAttention
watch(() => props.eachSquare, () => {
  isJoin.value = props.eachSquare!.isAttention
})
const userStore = useUserStore()
const unJoin = () => {
  unJoinSquare({categoryId: props.eachSquare!.id, userId: userStore.userId}).then(res => {
        Toast.success('取消加入该圈子')
        eventBus.emit('refreshSquare')
      }
  )
}
</script>

<style scoped lang="less">
.square-joinedSquare-item {
  margin-bottom: 20px;

  .item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: flex-start;
    }

    .avatar {
      margin-right: 15px;

      &-pic {
        border-radius: 5px;
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    }

    .info {
      &-desc {
        width: 140px;
        height: 20px;
        overflow-y: hidden;
      }

      &-number {
        color: #999999;
      }
    }

    .join {
      position: relative;
      top: 0px;
    }
  }


}
</style>
