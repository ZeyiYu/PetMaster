<template>
  <div class="home-eachPost">
<!--    <van-config-provider :theme-vars="themeVars">
      <div class="profile" v-if="userInfo && isFollowing">
        <div class="left">
          <div class="profile-left" @click="router.push({name:'othersPage',params:{userId:userInfo.id}})">
            <img class="profile-left-avatar" :src="userInfo.profilePhoto"/>
          </div>
          <div class="profile-right">
            <div class="font_s14">
              {{ userInfo.nickname }}
&lt;!&ndash;              <span v-if="userInfo.isExpert">
              <svg class="profile-right-icon" aria-hidden="true">
                  <use xlink:href="#icon-crown"></use>
              </svg>
          </span>&ndash;&gt;
            </div>
            <div class="time font_s12 font_w300">
              {{ postContent.createTime }}
            </div>
          </div>
        </div>
        <div class="right">
          <button class="right-btn" v-if="isFollowing.length === 0 && (postContent.userId !==loginUser)"
                  @click="followOrUnfollow">
             <span style="margin-right: 2px">
            <Icon name="plus" size="18"></Icon>
          </span>
            关注
          </button>

          <button class="right-btn2" v-if="(postContent.userId==loginUser)"
                  @click="deleteUserPost">
             <span style="margin-right: 2px">
            <Icon name="shanchu" size="18"></Icon>
          </span>
            删除
          </button>
        </div>
      </div>
      <div v-html="postContent.content" class="content font_s14 font_w300">
      </div>
      <div class="picture">
        <van-grid :border="false" :column-num="columnNum" center>
          <template v-for="(item,index) in postContent.pictureUrl">
            <van-grid-item @click="showImage(index)">
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
      <PostFooter :footer="postContent"></PostFooter>
    </van-config-provider>-->
    <van-config-provider :theme-vars="themeVars">
      <div class="profile">
        <div class="left">
          <div class="profile-left" @click="router.push({name:'othersPage',params:{userId:userInfo.id}})">
            <img class="profile-left-avatar" :src="postContent.profilePhoto"/>
          </div>
          <div class="profile-right">
            <div class="font_s14">
              {{ postContent.nickname }}
              <!--              <span v-if="userInfo.isExpert">
                            <svg class="profile-right-icon" aria-hidden="true">
                                <use xlink:href="#icon-crown"></use>
                            </svg>
                        </span>-->
            </div>
            <div class="time font_s12 font_w300">
              {{ postContent.createTime }}
            </div>
          </div>
        </div>
        <div class="right">
<!--          <button class="right-btn"
                  @click="followOrUnfollow">
             <span style="margin-right: 2px">
            <Icon name="plus" size="18"></Icon>
          </span>
            关注
          </button>-->
<!--
          <button class="right-btn2" v-if="(postContent.userId==loginUser)"
                  @click="deleteUserPost">
             <span style="margin-right: 2px">
            <Icon name="shanchu" size="18"></Icon>
          </span>
            删除
          </button>-->
        </div>
      </div>
      <div v-html="postContent.content" class="content font_s14 font_w300">
      </div>
      <div class="picture">
        <van-grid :border="false" :column-num="columnNum" center>
          <template v-for="(item,index) in postContent.pictureUrl">
            <van-grid-item @click="showImage(index)">
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
      <PostFooter :footer="postContent"></PostFooter>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
import {ConfigProviderThemeVars, showConfirmDialog, showImagePreview, Toast} from "vant";
import {transContent} from "@/utils/tools";
import {follow, getFollowerOrFollowing, unFollow} from "@/assets/api/Social/Follow";
import {useUserStore} from "@/store/userInfo";
import {deletePost} from "@/assets/api/Social/UserPost";

const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};
const props = defineProps({
  postContent: {
    type: Object,
  }
})
const userStore = useUserStore()
const userInfo = ref()
const isFollowing = ref()
const onEachPost = async () => {
  transContent(props.postContent)
  /*isFollowing.value = await getFollowerOrFollowing({
    attentionId: userStore.userId,
    attentionedId: props.postContent!.userId
  })*/
}

//图片分栏展示
const columnNum = ref()
const picHeight = ref()
if (props.postContent!.pictureUrl !== null) {
  switch (props.postContent!.pictureUrl.length) {
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
const showImage = (index: any) => {
  showImagePreview({
    images: props.postContent!.pictureUrl,
    startPosition: index
  })
}
onMounted(() => {
  onEachPost()
})
</script>

<style lang="less" scoped>
.home-eachPost {
  //border-top: 1px solid #eee;
  background-color: #fff;
  padding: 8px 15px;

  .profile {
    margin-top: 6px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
    }

    .right {
      &-btn {
        font-size: 13px;
        padding: 3px 10px 3px 6px;
        border-radius: 20px;
        background-color: transparent;
        border: 1px solid #EE8833;
        color: #EF8B36;
        margin-left: 5px;
        display: flex;
        align-items: center;
      }
    }

    .right {
      &-btn2 {
        font-size: 13px;
        padding: 3px 10px 3px 6px;
        border-radius: 20px;
        background-color: transparent;
        border: 1px solid #8e8e8e;
        color: #8e8e8e;
        margin-left: 5px;
        display: flex;
        align-items: center;
      }
    }

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
    margin-top: 5px;
  }

  .picture {
    margin-top: 5px;
  }
}
</style>
