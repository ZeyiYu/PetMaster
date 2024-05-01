<template>
  <div class="me-comment-item" v-if="commentUser && originalUser">
    <van-config-provider :theme-vars="themeVars">
      <div class="profile">
        <div class="profile-left">
          <img class="profile-left-avatar" :src="commentUser.profilePhoto" alt=""/>
        </div>
        <div class="profile-right">
          <div class="font_s16">
            {{ commentUser.nickname }}
            <span v-if="commentUser.isExpert">
              <svg class="profile-right-icon" aria-hidden="true">
                  <use xlink:href="#icon-crown"></use>
              </svg>
          </span>
          </div>
          <div class="time font_s12 font_w300">
            {{ comment.createTime }}
          </div>
        </div>
      </div>
      <div v-html="comment.content" class="content font_s14 font_w300">
      </div>

      <div class="original font_s14 font_w300">
        <span style="color:#0370d1">@{{ originalUser.nickname }}</span>
        :{{ originalPost.content }}
        <div class="original-picture">
          <van-grid :border="false" :column-num="columnNum" center>
            <template v-for="item in originalPost.pictureUrl">
              <van-grid-item>
                <van-image
                    position="center"
                    :src="item"
                    fit="cover"
                    width="100%"
                    :height="picHeight"
                />
              </van-grid-item>
            </template>
          </van-grid>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>
<script setup lang="ts">
import {ConfigProviderThemeVars} from "vant";
import {getUserInfoById} from "@/assets/api/Social/User";
import {Ref} from "vue";
const props = defineProps({
  commentContent: {
    type: Object,
  }
})
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: "2px",
  gridItemContentBackground: "#F7F7F7"
};

//被评论的帖子
const originalPost = props.commentContent!.newArticleVO
//评论内容
const comment = props.commentContent!.commentVO
//被评论的帖子用户
const originalUser = ref()
//评论用户
const commentUser = ref()

//加载评论者
const onCommentUser = async () => {
  commentUser.value = await getUserInfoById(props.commentContent!.commentVO.userId)
}

//加载被评论的帖子
const onOriginalPost = async () => {
  originalUser.value = await getUserInfoById(props.commentContent!.newArticleVO.userId)
}

//图片分栏展示
const columnNum = ref()
const picHeight = ref()
if(originalPost.pictureUrl !== null) {
  switch (originalPost.pictureUrl.length) {
    case 1:
      columnNum.value = 1
      picHeight.value = 215
      break
    case 2:
      columnNum.value = 2
      picHeight.value = 150
      break
    default:
      columnNum.value = 3
      picHeight.value = 100
  }
}
onMounted(() => {
  onCommentUser()
  onOriginalPost()
})
</script>

<style lang="less" scoped>
.me-comment-item {
  //border-top: 1px solid #eee;
  background-color: #fff;
  padding-bottom: 15px;

  .profile {
    margin-top: 6px;
    display: flex;
    padding: 8px 15px 0 15px;

    &-left {
      &-avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &-right {
      margin-left: 15px;

      &-icon {
        position: relative;
        top: 2px;
        width: 15px;
        height: 15px;
      }

      .time {
        margin-top: 2px;
        color: #8e8e8e;
      }
    }
  }

  .content {
    padding: 8px 15px;
  }

  .original {
    background-color: #F7F7F7;
    padding: 8px 15px;

    &-picture {
      padding: 5px 0 5px 0;
    }
  }
}
</style>
