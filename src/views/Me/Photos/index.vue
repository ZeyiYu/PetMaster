<template>
  <div class="me-photos">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Albums"
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-photos-content">
        <van-grid :border="false" :column-num="3" center gutter="3">
          <template v-for="item in album">
            <van-grid-item>
              <van-image
                  fit="cover"
                  position="center"
                  :src="item"
                  width="100%"
                  height="100"
              />
            </van-grid-item>
          </template>
        </van-grid>
      </div>
      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {getAlbum} from "@/assets/api/Social/UserPost";
import {useUserStore} from "@/store/userInfo";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
  gridItemContentPadding: "0"
};

const onClickLeft = () => history.back();

const userStore = useUserStore()
const album = ref()
const onPhotos = async () => {
  album.value = await getAlbum(userStore.userId)
}
onMounted(() => {
  onPhotos()
})
</script>

<style lang="less" scoped>
.me-photos {
  background-color: #f4f4f5;
  height: 100%;

  &-content {
    padding-bottom: 60px;
  }
}
</style>
