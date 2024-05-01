<template>
  <div class="square-eachSquare-item">
    <van-config-provider :theme-vars="themeVars">
      <div class="item">
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
            {{ eachSquare.articleCount }}个帖子 · {{ attentionCount }}人加入
          </div>
        </div>

        <div class="join flex_center_center" @click="JoinOrUnjoin">
          <van-button v-if="isJoin" color="#F6F6F6"
                      style="color:#2D6CE0;font-weight: 500;padding: 2px 9px;font-size: 13px">已加入
          </van-button>
          <van-button v-else color="#F6F6F6" icon="plus"
                      style="color:#2D6CE0;font-weight: 500;padding: 2px 5px;font-size: 13px">加入
          </van-button>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {joinSquare, unJoinSquare} from "@/assets/api/Social/UserSquare";
import {useUserStore} from "@/store/userInfo";
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
const isJoin = ref()
isJoin.value = props.eachSquare!.isAttention
//加入圈子的人数
const attentionCount = ref()
attentionCount.value = props.eachSquare!.attentionCount

watch(() => props.eachSquare, () => {
  isJoin.value = props.eachSquare!.isAttention
  attentionCount.value = props.eachSquare!.attentionCount
})
const userStore = useUserStore()
const JoinOrUnjoin = () => {
  if (isJoin.value) {
    unJoinSquare({categoryId: props.eachSquare!.id, userId: userStore.userId}).then(res => {
          isJoin.value = false
          eventBus.emit('refreshSquare')
          attentionCount.value--
        }
    )
  } else {
    joinSquare({categoryId: props.eachSquare!.id, userId: userStore.userId}).then(res => {
      isJoin.value = true
      attentionCount.value++
      eventBus.emit('refreshSquare')
    })
  }
}
</script>

<style scoped lang="less">
.square-eachSquare-item {
  width: 270px;
  margin-bottom: 20px;

  .item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .avatar {
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
      top: 10px;
    }
  }


}
</style>
