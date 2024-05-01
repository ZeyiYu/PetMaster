<template>
  <div class="feed-feeder">
    <van-config-provider :theme-vars="themeVars">
      <div class="profile">
        <div class="profile-title">
          <div class="font_s14">
            <div class="flex_center_center">
              <div style="margin-right: 8px;position:relative;top: -1px">
                <Icon name="yuyue1" color="#f4662f" size="16"></Icon>
              </div>
              <div style="color: #e4a140">
                Today's Schedule
              </div>
            </div>
          </div>
          <div class="flex_center_center" @click="router.push({name:'feedingSchedule'})">
            <Icon name="rightarrow" size="14"></Icon>
          </div>
        </div>
        <div v-for="item in todaySchedule">
          <div class="profile-content">
            <div class="profile-content-time">
              <div class="profile-content-time-left">
                <div class="profile-content-time-left-time">{{ item.feedingTime }}</div>
                <div class="profile-content-time-left-amount">{{ parseInt(item.foodAmount) }}g</div>
              </div>
              <div class="profile-content-time-right">{{ item.isPassed ? 'Completed' : 'Not Completed' }}</div>
            </div>
          </div>
          <div class="line"></div>
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
import {getFeederSchedules} from "@/assets/api/Feeder";

const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};

const todaySchedule = ref()
const onSchedule = () => {
  getFeederSchedules().then((res) => {
    todaySchedule.value = res.slice().sort((a: any, b: any) => {
      const timeA = new Date(`1970-01-01T${a.feedingTime}`).valueOf();
      const timeB = new Date(`1970-01-01T${b.feedingTime}`).valueOf();
      return timeA - timeB;
    }).map((item: any) => {
      const timeComponents = item.feedingTime.split(':');
      let hours = parseInt(timeComponents[0]);
      const minutes = parseInt(timeComponents[1]);
      let ampm = 'AM';
      if (hours >= 12) {
        ampm = 'PM';
        if (hours > 12) {
          hours -= 12;
        }
      }
      if (hours === 0) {
        hours = 12;
      }
      let time = currentTime()
      item.isPassed = isPassed(item.feedingTime, time)
      item.feedingTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      return item
    })
  })
}

function currentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function isPassed(originalTime: any, currentTime: any) {
  const originalTimestamp = Date.parse(`1970-01-01T${originalTime}`);
  const currentTimestamp = Date.parse(`1970-01-01T${currentTime}`);
  return currentTimestamp > originalTimestamp;
}

onMounted(() => {
  onSchedule()
})

</script>

<style lang="less" scoped>
.feed-feeder {
  background-color: #f4f4f5;
  padding: 15px 0;

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
      padding: 0 6px;
      margin: 15px 0 10px 0;
      display: flex;
      justify-content: space-between;

      &-time {
        font-weight: 300;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: #a1a2a1;

        &-left {
          display: flex;

          &-time {
            width: 70px;
          }

          &-amount {
            margin-left: 30px;
          }
        }

        &-right {

        }
      }
    }

    .line {
      height: 1px;
      width: 100%;
      background-color: #eee;
      margin-bottom: 10px;
    }

    .line:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
