<template>
  <div class="me">
    <van-config-provider :theme-vars="themeVars">
      <div class="content" v-if="userInfo">
        <div class="setting">
          <div class="setting-item" @click="router.push('/searchUser')">
            <Icon name="tianjiahaoyou" color="#000" size="22"></Icon>
          </div>
          <div class="setting-item" @click="router.push('/settings')">
            <Icon name="shezhi" color="#000" size="24"></Icon>
          </div>
        </div>
        <div class="profile">
          <div class="info">
            <div class="avatar flex_center_center">
              <!--
                            <img v-if="!loading" class="avatar-pic" :src="userAvatar" alt="" @click="showImage"/>
              -->
              <!--              <van-skeleton class="avatar-pic" title avatar :loading="loading"/>-->
              <img class="avatar-pic"
                   :src="userInfo.avatarURL
" alt=""
                   @click="showImage"/>
            </div>
            <div class="intro">
              <div class="intro-top">
                <div class="name font_s16 font_w400">
                  {{ userInfo.fullName }}
                </div>
                <!--                <div class="level">
                                  <div v-if="!isExperts" class="flex_center_center font_s14 font_w300"
                                       style="color:#989898;" @click="router.push('/beExpert')">
                                    <Icon name="zhuanjia" color="#989898" size="24"></Icon>
                                    立即成为专家
                                  </div>
                                  <div v-else class="flex_center_center font_s14 font_w300" style="color:#989898;">
                                    <svg style="width: 20px;height: 20px;margin-left: 5px" aria-hidden="true">
                                      <use xlink:href="#icon-crown"></use>
                                    </svg>
                                  </div>
                                </div>-->
              </div>
              <div class="intro-desc font_s14 font_w300">
                Description: I'm a dog person!
              </div>
            </div>
          </div>
        </div>
        <div class="components">
          <div class="item">
            <div class="font_s18 font_w400">
              23
            </div>
            <div class="item-name font_s14 font_w300">
              Posts
            </div>
          </div>
          <div class="item">
            <div class="font_s18 font_w400">
              123
            </div>
            <div class="item-name font_s14 font_w300">
              Following
            </div>
          </div>
          <div class="item">
            <div class="font_s18 font_w400">
              34
            </div>
            <div class="item-name font_s14 font_w300">
              Followers
            </div>
          </div>
        </div>
        <div class="choice">
          <div class="choice-wrapper">
            <div class="choice-wrapper-item">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-xiangce1"></use>
                </svg>
              </div>
              <div class="title font_s14 font_w300">
                Albums
              </div>
            </div>
            <div class="choice-wrapper-item">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-dianzan"></use>
                </svg>
              </div>
              <div class="title font_s14 font_w300">
                Likes/Collects
              </div>
            </div>
            <div class="choice-wrapper-item">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-lishijilu"></use>
                </svg>
              </div>
              <div class="title font_s14 font_w300">
                History
              </div>
            </div>
            <div class="choice-wrapper-item">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-jilu"></use>
                </svg>
              </div>
              <div class="title font_s14 font_w300">
                Pet Info
              </div>
            </div>
          </div>
        </div>
        <div class="personalPosts">
          <div class="font_s16">
            My posts
          </div>
          <div v-if="myPosts" v-for="item in myPosts">
            <PostItem :postContent="item"></PostItem>
          </div>
          <div class="flex_center_center" v-else>
            <van-loading type="spinner"/>
          </div>
        </div>
      </div>
      <div v-else class="flex_center_center loading">
        <van-loading type="spinner"></van-loading>
      </div>
      <Footer></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {useMe} from "@/views/Me/useMe";
import {showImagePreview} from "vant";
import {transContent} from "@/utils/tools";
import {useUserStore} from "@/store/userInfo";
import {getAllFans, getAllFollowing} from "@/assets/api/Social/Follow";
import {getUserPostCount} from "@/assets/api/Social/UserPost";

//登陆用户信息
const userInfo = ref()
const userStore = useUserStore()
const onLogin = async () => {
  await userStore.getUser();
  userInfo.value = userStore.userData
}
onMounted(() => {
  onLogin()
})
const myPosts = ref()
myPosts.value = [{
  pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost.JPG'],
  createTime: '2023-12-15',
  content: 'An Easy 30 Minute Dog Biscuit Recipe From Just 6 Ingredients! #dogs #doglovers #dogfriendly',
  nickname: 'Zachary Miller',
  profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/userAvatar.jpg',
  mentioned: ['#dogs', '#doglovers', '#dogfriendly']
},
  {
    pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost2.jpg', 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost3.jpg'],
    createTime: '2023-12-15',
    content: 'This #ChocolateDay please remember to keep your chocolate out of your dog\'s reach as even a small amount can be seriously dangerous for their health. If you think that your dog has managed to get hold of some chocolate, don\'t wait and see, get them to a vet straight away. #Pet24',
    nickname: 'Zachary Miller',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/userAvatar.jpg',    mentioned: ['#ChocolateDay', '#Pet24']
  }]
myPosts.value.map((item: any) => {
  transContent(item)
});
const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#6480CA',
  navBarTitleTextColor: '#fff',
  cellGroupTitleColor: '#383B42',
};
/*
const {
  allPosts,
  allFollowing,
  allFans,
  userName,
  userId,
  userAvatar,
  isExperts,
  loading,
  myPosts
} = useMe()*/
//点击头像展示大图
const showAvatar: any = ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/userAvatar.jpg']
/*
watch(userAvatar, () => {
  if (userAvatar.value) {
    showAvatar.push(userAvatar.value)
  }
})
*/

const showImage = () => {
  showImagePreview({
    images: showAvatar
  })
}
</script>

<style lang="less" scoped>
.me {
  height: 100%;
  background-color: #f4f4f5;

  .loading {
    padding-top: 60px;
  }

  .content {
    background-color: #f4f4f5;
    padding-bottom: 50px;
  }

  .setting {
    padding-top: 5px;
    display: flex;
    justify-content: flex-end;

    &-item {
      padding: 0 8px 0 8px;
    }
  }

  .profile {
    padding: 0px 20px 20px 20px;
    z-index: 1;
    position: relative;

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

  .choice {
    display: flex;
    justify-content: center;

    &-wrapper {
      width: 350px;
      height: 100px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      &-item {
        text-align: center;

        .icon {
          &-pic {
            height: 30px;
            width: 30px;
          }

        }

        .title {
          margin-top: 5px;
        }
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
