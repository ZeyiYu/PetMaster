<template>
  <div class="me-following">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Following"
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-following-content" v-if="followingUsers">
        <div class="me-following-content-wrapper" v-for="item in followingUsers">
          <FollowingItem :followingUser="item"></FollowingItem>
        </div>
      </div>
      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {getFollowerOrFollowing} from "@/assets/api/Social/Follow";
import {useUserStore} from "@/store/userInfo";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
};
const onClickLeft = () => history.back();
const userStore = useUserStore()
const followingUsers = ref()
const onFollowing = async () => {
  followingUsers.value = await getFollowerOrFollowing({attentionId: userStore.userId})
}
onMounted(() => {
  onFollowing()
})
</script>

<style lang="less" scoped>
.me-following {
  height: 100%;
  background-color: #f4f4f5;

  &-content {
    background-color: #f4f4f5;
    padding-bottom: 60px;
    margin-top: 10px;

    &-wrapper {
      padding: 8px 10px;
    }
  }

}
</style>
