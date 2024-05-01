<template>
  <div class="message-searchUser">
    <van-config-provider :theme-vars="themeVars">
      <div class="content">
        <van-nav-bar
            title="Search Users"
            left-arrow
            @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="search flex_center_center">
          <van-search
              class="search-input"
              v-model="searchUser"
              placeholder="User Nickname"
              input-align="center"
              @update:model-value="onSearch"
          />
        </div>
        <div class="result">
          <template v-for="item in searchResult">
            <div class="result-item" @click="router.push({name:'othersPage',params:{userId:item.id}})">
              <div class="result-item-avatar flex_center_center">
                <img :src="item.profilePhoto" class="result-item-avatar-img" alt="">
              </div>
              <div class="result-item-info">
                <div class="font_s16">
                  {{ item.nickname }}
                </div>
                <div class="font_s14 result-item-info-signature">
                  {{ item.personalSignature }}
                </div>
              </div>
            </div>
            <div class="line"></div>
          </template>
        </div>
      </div>
      <Footer :active="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ConfigProviderThemeVars} from "vant";
import {searchByUsername} from "@/assets/api/Social/User";

const themeVars: ConfigProviderThemeVars = {
  navBarTextColor: '#333333',
  navBarTitleFontSize: '18px',
  navBarBackground: '#F7F7F7',
  searchBackground: '#eeeeee',
  searchContentBackground: '#eeeeee'
};
const onClickLeft = () => history.back();
const router = useRouter()
const searchUser = ref()
const searchResult = ref()
const onSearch = async () => {
  searchResult.value = await searchByUsername(searchUser.value)
}

onMounted(()=>{
  /*onSearch()*/
})
</script>

<style lang="less" scoped>
.message-searchUser {
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  height: calc(100vh - 65px);
  overflow-y: auto;

  .content {
    overflow-y: auto;

    .search {
      position: relative;
      margin-bottom: 20px;
      padding-top: 10px;

      &-input {
        background-color: #eee;
        border-radius: 5px;
        height: 40px;
        width: 360px;
      }
    }

    .result {
      width: 350px;
      background-color: #fff;
      border-radius: 8px;
      margin-bottom: 20px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);


      &-item {
        display: flex;
        align-items: center;
        padding: 10px;

        &-avatar{
          &-img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }

        &-info {
          margin-left: 15px;

          &-signature {
            color: #18191D;
          }
        }
      }

      .line {
        width: 100%;
        height: 1px;
        background-color: #eee;
      }
    }
  }
}
</style>
