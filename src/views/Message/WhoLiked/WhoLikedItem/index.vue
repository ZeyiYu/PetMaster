<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="message-liked-item" v-if="originalPost">
      <div class="avatar flex_center_center">
        <img class="avatar-img" :src="userInfo.userVO.profilePhoto" alt=""/>
      </div>
      <div class="right">
        <div class="right-info">
          <div class="name font_s14 font_w400">
            {{ userInfo.userVO.nickname }}
          </div>
          <div class="time font_w300">
            {{ userInfo.createTime }}
          </div>
        </div>
        <div class="right-content font_s14 font_w300">
          赞了你的帖子
        </div>
      </div>
      <div class="original font_s14 font_w300" v-if="originalPost">
        <span style="color:#0370d1">@{{ nickname }}</span>
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
    </div>
    <div class="line" v-if="originalPost"></div>
  </van-config-provider>
</template>

<script setup lang="ts">
import {getUserPost} from "@/assets/api/Social/UserPost";
import {ConfigProviderThemeVars} from "vant";
import {useUserStore} from "@/store/userInfo";

const props = defineProps({
  userInfo: {
    type: Object
  }
})

const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: "2px",
  gridItemContentBackground: "#F7F7F7"
};

const userStore = useUserStore()
const nickname = userStore.userData.user.nickname
//图片分栏展示
const columnNum = ref()
const picHeight = ref()
const originalPost = ref()
const onWhoLikedItem = async () => {
  const res = await getUserPost({id: props.userInfo!.articleId})
  originalPost.value = res[0]
  if (originalPost.value.pictureUrl !== null) {
    switch (originalPost.value.pictureUrl.length) {
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
}
onMounted(() => {
  onWhoLikedItem()
})
</script>

<style lang="less" scoped>
.message-liked-item {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  //background-color: #fff;
  padding-bottom: 15px;

  .avatar {
    width: 50px;
    height: 50px;
    margin: 5px 0 5px 10px;

    &-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .right {
    margin: 5px 0 5px 10px;

    &-info {
      display: flex;
      justify-content: space-between;
      width: 280px;
      font-size: 16px;
      color: #000;

      .name {
        color: #333;
      }

      .time {
        margin-left: 20px;
        font-size: 14px;
        color: #989898;
        line-height: 21px;
      }
    }

    &-content {
      margin-top: 0px;
      height: 20px;
      overflow-y: hidden;
      font-size: 14px;
      color: #989898;
    }
  }

  .original {
    background-color: #F7F7F7;
    padding: 8px 15px;
    width: 100%;

    &-picture {
      padding: 5px 0 5px 0;
    }
  }
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eaeaeb;
}
</style>
