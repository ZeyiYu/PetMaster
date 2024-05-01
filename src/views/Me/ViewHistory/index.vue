<template>
  <div class="me-viewHistory">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="History"
          left-arrow
          fixed
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-viewHistory-wrapper" v-if="articleList.length !== 0">
        <template v-for="item in articleList">
          <ViewHistoryItem :articleList="item"></ViewHistoryItem>
        </template>
      </div>
      <div class="loading flex_center_center" v-else>
        <van-loading type="spinner"></van-loading>
      </div>
      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {getViewHistory} from "@/assets/api/Social/ViewHistory";
import {getUserPost, getUserPostCount} from "@/assets/api/Social/UserPost";
import {Ref} from "vue";
import {useUserStore} from "@/store/userInfo";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#fff',
};
const onClickLeft = () => history.back();

const viewList = ref([])
const articleList: Ref<any[]> = ref([])
const userStore = useUserStore()
const onViewHistory = async () => {
  getViewHistory(userStore.userId).then(res => {
    viewList.value = res;
    viewList.value.forEach((item: any) => {
      getUserPost({id: item.articleId}).then(res => {
        articleList.value.push(res[0])
      })
    })
  })
}
onMounted(() => {
  onViewHistory()
})

</script>

<style lang="less" scoped>
.me-viewHistory {
  height: 100%;
  background-color: #fff;

  &-wrapper {
    padding: 60px 20px 20px 20px;
  }
  .loading{
    padding-top: 60px;
  }
}
</style>
