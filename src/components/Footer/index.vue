<template>
  <div class="footer">
    <van-config-provider :theme-vars="themeVars">
      <van-tabbar route v-model="active">
        <van-tabbar-item name="home" replace to="/home">
          <span>Home</span>
          <template #icon="props">
            <Icon name="shouye" size="20"></Icon>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="square" icon="apps-o" replace to="/square">
          <span>Feed</span>
          <template #icon="props">
            <Icon name="quanzi" size="22"></Icon>
          </template>
        </van-tabbar-item>
<!--        <van-tabbar-item name="appoint" icon="plus" replace to="/appointment">
          <span>预约</span>
          <template #icon="props">
            <Icon name="yuyue" size="20"></Icon>
          </template>
        </van-tabbar-item>-->
        <van-tabbar-item name="message" icon="comment-o" replace to="/message">
          <span>Notifications</span>
          <template #icon="props">
            <Icon name="xiaoxi" size="22"></Icon>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="me" icon="contact" replace to="/me">
          <span>Me</span>
          <template #icon="props">
            <Icon name="wode" size="20"></Icon>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  footerActive: {
    type: Number,
    default: 0
  }
})
const active = ref('home');
import type {ConfigProviderThemeVars} from 'vant';

const themeVars: ConfigProviderThemeVars = {
  tabbarBackground: '#eee',
  tabbarItemActiveBackground: '#eee'
};
onMounted(() => {
  //active.value = props.footerActive
})
</script>

<style lang="less" scoped>
</style>
