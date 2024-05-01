<template>
  <div class="home-postPage">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="返回"
          title="帖子"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="home-postPage-content" v-if="postContent">
        <div class="home-postPage-content-wrapper">
          <EachPost :postContent="postContent"></EachPost>
          <div class="line"></div>
        </div>
        <div class="home-postPage-content-comment">
          <template v-for="item in postComment" :key="item.articleId">
            <PostPageComment :postComment="item"></PostPageComment>
          </template>
        </div>
        <div class="review">
          <div class="review-input flex_center_center">
            <input
                class="review-input-comp"
                placeholder="写评论"
                v-model="review"
                @keyup.enter="sendReview"
            />
          </div>
        </div>
      </div>
      <div v-else class="loading flex_center_center">
        <van-loading type="spinner"/>
      </div>
      <Footer></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ConfigProviderThemeVars} from "vant";
import {getUserPost} from "@/assets/api/Social/UserPost";
import {getPostComment, sendComment} from "@/assets/api/Social/PostComment";
import {useUserStore} from "@/store/userInfo";
import Toast from "@/components/Toast";
import {getNowDate} from "@/utils/tools";
import eventBus from "@/utils/eventBus";
import {newViewHistory} from "@/assets/api/Social/ViewHistory";

const onClickLeft = () => history.back();
const themeVars: ConfigProviderThemeVars = {};
const router = useRouter()
const route = useRoute()

const postId = route.params.articleId
const postContent = ref()
const postComment = ref()
const onPostPage = async () => {
  //帖子内容
  const content = await getUserPost({id: postId})
  postContent.value = content[0]

  //帖子评论
  const comment = await getPostComment({articleId: postId})
  postComment.value = comment
}

//发表评论
const review = ref()
const userStore = useUserStore()
const sendReview = () => {
  sendComment({
    userId: userStore.userId,
    articleId: postId,
    content: review.value
  }).then(res => {
    let tempComment = {
      articleId: postId,
      content: review.value,
      createTime: getNowDate(),
      isDeleted: 0,
      updateTime: getNowDate(),
      userId: userStore.userId
    }
    postComment.value.unshift(tempComment)
    Toast.success('评论成功')
    review.value = ''
    eventBus.emit('makeComment');
  })
}
onMounted(() => {
  onPostPage()
  newViewHistory({userId: userStore.userId, articleId: postId}).then(res=>{
  })
})

</script>

<style lang="less" scoped>
.home-postPage {
  position: relative;
  height: 100%;
  background-color: #fff;

  &-content {
    padding: 40px 0 100px 0;

    &-wrapper {
      .line {
        width: 100%;
        height: 10px;
        background-color: #eaeaeb;
      }
    }

    &-comment {
      padding-top: 10px;
    }

    .review {
      position: fixed;
      bottom: 50px;
      border-top: 0.5px solid #eee;
      background-color: #fff;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      z-index: 1;

      &-input {
        &-comp {
          width: 350px;
          height: 35px;
          padding: 0 10px;
          border-radius: 20px;
          background-color: #F4F4F4;
          font-size: 14px;
        }
      }
    }

  }

  .loading {
    padding-top: 80px;
  }
}
</style>
