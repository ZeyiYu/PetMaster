<template>
  <div class="me">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="返回"
          title="他的主页"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="content" v-if="userInfo">
        <div class="profile">
          <div class="info">
            <div class="avatar flex_center_center">
              <img v-if="!loading" class="avatar-pic" :src="userAvatar" alt="" @click="showImage"/>
              <van-skeleton class="avatar-pic" title avatar :loading="loading"/>
            </div>
            <div class="intro">
              <div class="intro-top">
                <div class="name font_s16 font_w500">
                  {{ userName }}
                </div>
                <div class="level">
                  <div v-if="userInfo.isExperts" class="flex_center_center font_s14 font_w300" style="color:#989898;">
                    <svg style="width: 20px;height: 20px;margin-left: 5px" aria-hidden="true">
                      <use xlink:href="#icon-crown"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="intro-desc font_s14 font_w300">
                社交ID：{{ userInfo.id }}
              </div>
            </div>
          </div>
          <div class="chat">
            <button class="chat-btn" v-if="isFollowing.length === 0" @click="followOrUnfollow">
              关注
            </button>
            <button class="chat-btn following" v-else @click="followOrUnfollow">
              已关注
            </button>
            <button class="chat-btn" @click="router.push({name:'chat',params:{otherId:route.params.userId,userId:loginUserId}})">
              聊天
            </button>
          </div>
        </div>
        <div class="components">
          <div class="item">
            <div class="font_s18 font_w400">
              {{ allPosts }}
            </div>
            <div class="item-name font_s14 font_w300">
              帖子
            </div>
          </div>
          <div class="item">
            <div class="font_s18 font_w400">
              {{ allFollowing }}
            </div>
            <div class="item-name font_s14 font_w300">
              关注
            </div>
          </div>
          <div class="item">
            <div class="font_s18 font_w400">
              {{ allFans }}
            </div>
            <div class="item-name font_s14 font_w300">
              粉丝
            </div>
          </div>
        </div>
        <div class="personalPosts">
          <div class="font_s16">
            他的帖子
          </div>
          <div v-if="myPosts" v-for="item in myPosts">
            <PostItem :postContent="item"></PostItem>
          </div>
          <div class="flex_center_center" v-else>
            <van-loading type="spinner"/>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {showImagePreview} from "vant";
import {follow, getAllFans, getAllFollowing, getFollowerOrFollowing, unFollow} from "@/assets/api/Social/Follow";
import {getUserPost, getUserPostCount} from "@/assets/api/Social/UserPost";
import {getUserInfoById} from "@/assets/api/Social/User";
import {transContent} from "@/utils/tools";
import {Ref} from "vue";
import {useUserStore} from "@/store/userInfo";

const onClickLeft = () => history.back();
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
};

const allPosts = ref()
//关注数量
const allFollowing = ref()
//粉丝数量
const allFans = ref()
//登录用户ID
const loginUserId = ref()
loginUserId.value = userStore.userId
//用户头像
const userAvatar = ref()
//用户名
const userName = ref()
//登录用户是否关注此用户
const isFollowing = ref()
const loading: Ref<boolean> = ref(true)

const myPosts = ref()
const userInfo = ref()
const onOthersPage = async () => {
  let userId = parseInt(route.params.userId as string)
  isFollowing.value = await getFollowerOrFollowing({attentionId: userStore.userId, attentionedId: userId})
  //关注数
  const tempFollowing = await getAllFollowing(userId)
  allFollowing.value = tempFollowing.attentionNumber
  //粉丝数
  const tempFans = await getAllFans(userId)
  allFans.value = tempFans.fansNumber
  //帖子数
  const tempPosts = await getUserPostCount(userId)
  allPosts.value = tempPosts.articleCount
  //用户信息
  userInfo.value = await getUserInfoById(userId)
  loading.value = false
  const {profilePhoto, nickname} = userInfo.value
  userAvatar.value = profilePhoto
  userName.value = nickname
  myPosts.value = await getUserPost({userId: userId})
  myPosts.value.map((item: any) => {
    transContent(item)
  });
}
onMounted(() => {
  onOthersPage()
})

//点击头像展示大图
const showAvatar: any = []
watch(userAvatar, () => {
  if (userAvatar.value) {
    showAvatar.push(userAvatar.value)
  }
})

const showImage = () => {
  showImagePreview({
    images: showAvatar
  })
}

//点击关注
const followOrUnfollow = async () => {
  //已经关注，点击取消关注
  if (isFollowing.value.length !== 0) {
    const res = await unFollow({attentionId: userStore.userId, attentionedId: userInfo.value.id});
    isFollowing.value.pop()
  } else {
    //未关注，点击关注
    const res = await follow({attentionId: userStore.userId, attentionedId: userInfo.value.id})
    isFollowing.value.push({
      attentionId: userStore.userId,
      attentionedId: userInfo.value.id
    })
  }
}
</script>

<style lang="less" scoped>
.me {
  height: 100%;
  background-color: #f4f4f5;

  .content {
    background-color: #f4f4f5;
    padding: 35px 0 50px 0;
  }

  .profile {
    padding: 20px 20px 20px 20px;
    z-index: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info {
      display: flex;
      align-items: center;

      .avatar {
        &-pic {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .intro {
        margin-left: 20px;

        &-top {
          display: flex;
          align-items: center;
        }

        &-desc {
          color: #8e8e8e;
          margin-top: 5px;
        }
      }
    }

    .chat {
      &-btn {
        font-size: 14px;
        padding: 3px 15px 3px 15px;
        border-radius: 20px;
        background-color: transparent;
        border: 1px solid #1989fa;
        color: #1989fa;
        margin-left: 5px;
      }
    }
  }

  .components {
    display: flex;
    color: #000;
    justify-content: space-around;

    .item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 80px;

      &-name {
        width: 80px;
        text-align: center;
        color: #8e8e8e;
        margin: 5px 0 15px 0;
      }
    }
  }

  .personalPosts {
    padding: 15px;
    border-radius: 5px;
    background-color: #fff;
    width: 350px;
    margin: 15px auto;

  }
}
</style>
