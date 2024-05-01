<template>
  <div class="home-content">
    <van-config-provider :theme-vars="themeVars">
      <div class="home-content-posts" v-for="item in allPosts" v-if="allPosts">
        <EachPost :postContent="item"></EachPost>
        <div class="line">
        </div>
      </div>
      <div v-else class="flex_center_center loading">
        <van-loading type="spinner"></van-loading>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {ConfigProviderThemeVars} from "vant";
import {getFollowingPosts, getPostCategory, getUserPost, getUserPostCount} from "@/assets/api/Social/UserPost";
import {useUserStore} from "@/store/userInfo";
import {transContent} from "@/utils/tools";

const themeVars: ConfigProviderThemeVars = {
  tabActiveTextColor: '#1e81e7',
  tabsBottomBarColor: '#fff'
};
//当前选中的帖子的分类
const userStore = useUserStore()
//帖子分类
const postCategory = ref<any>([])
//所有帖子内容
const allPosts = ref()
const onHomeContent = async () => {
  const category = await getPostCategory({})
  for (let key in category) {
    postCategory.value.push(key)
  }
  allPosts.value = await getFollowingPosts(userStore.userId)
  allPosts.value.map((item: any) => {
    transContent(item)
  });

}
onMounted(() => {
  onHomeContent()
})
</script>

<style lang="less" scoped>
.home-content {
  margin-top: 8px;
  padding-bottom: 50px;
  background-color: #fff;
  border-top: 1px solid #eee;

  &-posts {
    //padding: 10px 15px 0 15px;
  }

  .loading {
    padding-top: 20px;
  }

  .line {
    width: 100%;
    height: 10px;
    background-color: #eaeaeb;
    border: none;
  }
}
</style>
