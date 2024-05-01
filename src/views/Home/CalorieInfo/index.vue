<template>
  <div class="home-calorieInfo">
    <van-config-provider :theme-vars="themeVars">
      <div class="profile">
        <div class="profile-title" @click="router.push('/caloriePage')">
          <div class="font_s14">
            <div class="flex_center_center">
              <div style="margin-right: 8px">
                <Icon name="kaluli-01" color="#f4662f" size="18"></Icon>
              </div>
              <div style="color: #e4a140">
                Active Energy
              </div>
            </div>
          </div>
          <div class="flex_center_center">
            <Icon name="rightarrow" size="14"></Icon>
          </div>
        </div>
        <div class="profile-content">
          <div class="profile-content-left">
            <div class="profile-content-left-desc">
              <div class="font_s14 font_w300 " style="color:#a0a0a1">
                Average Kilocalories
              </div>
              <div class="font_s14 font_w400">
                <span class="font_s18">364</span>
                <span class="font_s14" style="color:#a0a0a1;margin-left: 5px">kcal</span>
              </div>
            </div>
            <div class="profile-content-left-desc">
              <div class="font_s14 font_w300" style="color:#a0a0a1">
                Exercise
              </div>
              <div class="font_s14 font_w400">
                <span class="font_s18">30</span>
                <span class="font_s14" style="color:#a0a0a1;margin-left: 5px">min</span>
              </div>
            </div>
            <div class="profile-content-left-desc">
              <div class="font_s14 font_w300" style="color:#a0a0a1">
                Distance
              </div>
              <div class="font_s14 font_w400">
                <span class="font_s18">8.49</span>
                <span class="font_s14" style="color:#a0a0a1;margin-left: 5px">km</span>
              </div>
            </div>
          </div>
          <div class="profile-content-chart">
            <div class="profile-content-chart-wrapper" v-for="item in days">
              <div class="profile-content-chart-wrapper-bar" :style="{height: item.height}">
              </div>
              <div class="font_s12 profile-content-chart-wrapper-title">
                {{ item.day }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
import {ConfigProviderThemeVars, showConfirmDialog, showImagePreview, Toast} from "vant";
import {transContent} from "@/utils/tools";
import {follow, getFollowerOrFollowing, unFollow} from "@/assets/api/Social/Follow";
import {useUserStore} from "@/store/userInfo";
import {deletePost} from "@/assets/api/Social/UserPost";


const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};

const days = [
  {day: 'S', height: 40 + 'px'},
  {day: 'S', height: 80 + 'px'},
  {day: 'M', height: 120 + 'px'},
  {day: 'T', height: 80 + 'px'},
  {day: 'W', height: 45 + 'px'},
  {day: 'T', height: 110 + 'px'},
  {day: 'F', height: 50 + 'px'}
]
</script>

<style lang="less" scoped>
.home-calorieInfo {
  //border-top: 1px solid #eee;
  background-color: #f4f4f5;
  padding: 8px 15px;

  .profile {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 15px 20px 15px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #595959;
    }

    &-content {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      &-left {
        &-desc {
          margin: 0px 0 10px 0;
        }
      }

      &-chart {
        display: flex;

        &-wrapper {
          height: 140px;
          width: 13px;
          margin-left: 10px;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-end;
          justify-content: center;

          &-bar {
            width: 13px;
            //height: 120px;
            background-color: #eee;
            border-radius: 5px 5px 0 0;
            margin-bottom: 4px;
          }

          &-title {
            color: #a1a1a1;
          }
        }
      }
    }
  }
}
</style>
