<template>
  <div class="me-postFooter font_s14 font_w300">
    <div class="item" @click="collect">
      <div v-if="!isCollected" class="icon">
        <Icon name="shoucang" color="#3c3c3d" size="18"></Icon>
      </div>
      <div v-else class="icon">
        <Icon name="shoucangfill" color="#F3BF66" size="18"></Icon>
      </div>
      {{ collectCount }}
    </div>
    <div class="item" @click="router.push({name:'postPage',params:{articleId:footer.id}})">
      <div class="icon">
        <Icon name="comment" color="#3c3c3d" size="18"></Icon>
      </div>
      {{ commentCount }}
    </div>
    <div class="item" @click="thumbUp">
      <div v-if="!isThumbsUp" class="icon">
        <Icon name="like" color="#3c3c3d" size="19"></Icon>
      </div>
      <div v-else class="icon">
        <Icon name="liked" color="#EA3E4A" size="19"></Icon>
      </div>
      {{ thumbsUpCount }}
    </div>

  </div>
</template>

<script setup lang="ts">
import {likePost, unlikePost} from "@/assets/api/Social/ThumbUp";
import {collectPost, uncollectPost} from "@/assets/api/Social/Collect";
import {getPostCommentCount} from "@/assets/api/Social/PostComment";
import eventBus from "@/utils/eventBus";
import {useUserStore} from "@/store/userInfo";

const userStore = useUserStore()
const router = useRouter()
const props = defineProps({
  footer: {
    type: Object,
  }
})

//评论数量
const commentCount = ref()
const onPostFooter = async () => {
  /*  const res = await getPostCommentCount(props.footer!.id)
    if (res.data === 0) {
      commentCount.value = res.data
    } else {
      commentCount.value = res
    }*/
}

//点赞数和收藏数
const isThumbsUp = ref()
const isCollected = ref()
const collectCount = ref()
const thumbsUpCount = ref()
isThumbsUp.value = props.footer!.isThumbsUp
isCollected.value = props.footer!.isCollected
collectCount.value = props.footer!.collectCount
thumbsUpCount.value = props.footer!.thumbsUpCount

//点击点赞
const thumbUp = () => {
  if (!isThumbsUp.value) {
    likePost(props.footer!.id, userStore.userId).then(res => {
    })
    thumbsUpCount.value++
  } else {
    unlikePost(props.footer!.id, userStore.userId).then(res => {
    })
    thumbsUpCount.value--
  }
  isThumbsUp.value = !isThumbsUp.value
}
//点击收藏
const collect = () => {
  if (!isCollected.value) {
    collectPost(props.footer!.id, userStore.userId).then(res => {
    })
    collectCount.value++
  } else {
    uncollectPost(props.footer!.id, userStore.userId).then(res => {
    });
    collectCount.value--
  }
  isCollected.value = !isCollected.value
}
const addCommentCount = () => {
  commentCount.value++
}

onMounted(() => {
  onPostFooter()
  eventBus.on('makeComment', addCommentCount)
})
onUnmounted(() => {
  eventBus.off('makeComment', addCommentCount)
})
</script>

<style lang="less" scoped>
.me-postFooter {
  display: flex;
  justify-content: space-around;

  .item {
    margin-top: 10px;
    display: flex;
    align-items: center;
    color: #5d5c5c;

    .icon {
      margin-right: 5px;
    }
  }
}
</style>
