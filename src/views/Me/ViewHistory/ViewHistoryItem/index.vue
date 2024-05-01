<template>
  <div class="me-viewHistory-item">
    <van-config-provider :theme-vars="themeVars">
      <div class="item">
        <div class="item-avatar">
          <img class="item-avatar-pic" :src="userAvatar"/>
        </div>
        <div class="item-info">
          <div class="item-info-top font_s16">
            <div class="font_s14">
              {{ userName }}
            </div>
            <div class="font_s12 font_w300" style="color:#8e8e8e;">
              {{ articleList.createTime }}
            </div>
          </div>
          <div class="item-info-desc font_s14 font_w300" v-html="articleList.content">
          </div>
          <div class="item-info-photos">
            <van-grid :border="false" square center>
              <van-grid-item v-for="(item,index) in articleList.pictureUrl" :key="index">
                <van-image
                    @click="showImage(index)"
                    width="75"
                    height="75"
                    fit="cover"
                    :src="item"
                />
              </van-grid-item>
            </van-grid>
          </div>
          <van-divider></van-divider>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {useUserStore} from "@/store/userInfo";
import {getAllFans, getAllFollowing} from "@/assets/api/Social/Follow";
import {getUserPostCount} from "@/assets/api/Social/UserPost";
import {getUserInfoById} from "@/assets/api/Social/User";
import {showImagePreview} from "vant";
import {transContent} from "@/utils/tools";

const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};
const props = defineProps({
  articleList: {
    type: Object
  }
})
const userInfo = ref()
const userName = ref()
const userAvatar = ref()

//获取发帖用户的头像和名称
async function getUser() {
  userInfo.value = await getUserInfoById(props.articleList!.userId)
  const {nickname, profilePhoto} = userInfo.value
  userName.value = nickname
  userAvatar.value = profilePhoto
}

const showImage = (index: any) => {
  showImagePreview({
    images: props.articleList!.pictureUrl,
    startPosition: index
  })
}
onMounted(() => {
  transContent(props.articleList)
  getUser()
})

</script>

<style lang="less" scoped>
.me-viewHistory {
  .item {
    display: flex;

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
      width: 100%;

      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-desc {
        margin-top: 2px;
      }

      &-photos {
        margin-top: 0px
      }
    }
  }

}
</style>
