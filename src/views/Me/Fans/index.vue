<template>
  <div class="me-fans">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Followers"
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-fans-content" v-if="fans">
        <div class="me-fans-content-wrapper" v-for="item in fans">
          <FansItem :fansUser="item"></FansItem>
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
const fans = ref()
const onFans = async () => {
  fans.value = await getFollowerOrFollowing({attentionedId: userStore.userId})
}
onMounted(()=>{
  onFans()
})
</script>

<style lang="less" scoped>
.me-fans {
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
