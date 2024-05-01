<template>
  <div class="home-schedule">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Feeding Schedule"
          fixed
          left-arrow
          @click-left="onClickLeft"

          right-text="Confirm"
          @click-right="changeSchedule"
      >
      </van-nav-bar>
      <div class="home-schedule-content">
        <div style="padding:15px 18px 10px 18px">
          <div class="home-schedule-content-wrapper">
            <div class="home-schedule-content-wrapper-avatar">
              <img class="home-schedule-content-wrapper-avatar-img" src="/src/assets/image/schedule.png"/>
            </div>
            <div>
              <van-cell-group inset>
                <van-field v-model="feedTime" type="digit" label="Feeding frequency" maxlength="2" label-width="130"
                           input-align="right">
                  <template #extra>
                    <span class="font_s14" style="margin-left: 5px">  times</span>
                  </template>
                </van-field>
                <template v-for="(item, index) in Array.from({ length: parseInt(feedTime) })">
                  <van-cell
                      :title="'Feeding time' + ' '+(index + 1)"
                      :is-link="feedSchedule[index] === ''"
                      @click="showPopup(index)"
                      :value="feedSchedule[index]"
                  />
                </template>
              </van-cell-group>
              <van-popup v-model:show="scheduleShow" position="bottom" :style="{ padding: '10px' }">
                <div>
                  <van-time-picker
                      v-model="currentTime"
                      title="Feeding time"
                      @confirm="confirmTime"
                      @cancel="cancelTime"
                  >
                    <template #confirm>Confirm</template>
                    <template #cancel>Cancel</template>

                  </van-time-picker>
                </div>
              </van-popup>

            </div>
          </div>
        </div>

        <div class="home-schedule-content-list">
          <div class="font_s16" style="padding: 10px 0 10px 25px">
            Feeding Record
          </div>
          <van-cell-group inset>
            <template v-for="item in feedingRecordsByTimes">
              <van-cell :title="item.date" :value="item.times + ' times'"/>
            </template>
          </van-cell-group>
        </div>

      </div>
      <Footer :footerActive="0"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import * as echarts from 'echarts';

import {useAtMe} from "@/views/Message/AtMe/UseAtMe";
import {changeFeederSchedules, getFeederRecords, getFeederSchedules, setFeederSchedules} from "@/assets/api/Feeder";
import {formattedTime, getDate} from "@/utils/tools";
import Toast from "@/components/Toast";

const chartStyle = ref({
  height: "",
  width: ""
});

const indexList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const list = [...Array(50).keys()];
const themeVars: ConfigProviderThemeVars = {
  //navBarBackground: '#f4f4f5',
};

//每日喂食次数默认为1
const feedTime = ref(1);
//喂食弹窗
const scheduleShow = ref(false);
//喂食时间数组
const feedSchedule = ref<any[]>([]);
// 当前设置的是time几
const feedOrder = ref(0);
const showPopup = (index: any) => {
  feedOrder.value = index;
  if (!scheduleShow.value) {
    scheduleShow.value = true;
  } else {
    scheduleShow.value = false;
  }
};

const submitTime = ref()
const confirmTime = () => {
  feedSchedule.value[feedOrder.value] = currentTime.value.at(0) + ':' + currentTime.value.at(1)
  scheduleShow.value = false;
  const today = new Date().toISOString().slice(0, 10);
  submitTime.value = feedSchedule.value.map(time => {
    const combinedDateTime = `${today}T${time}:00`; // 组合日期和时间
    return combinedDateTime;
  });
}
const cancelTime = () => {
  scheduleShow.value = false;
}

const changeSchedule = () => {
  changeFeederSchedules({feedingSchedules: submitTime.value}).then(res => {
    Toast.success('Set the feeding schedule successfully!')
  })
  setFeederSchedules(
      {
        time: submitTime.value,
        amount: 60
      }).then(res => {
    console.log(res, 'fuck')

  })
}

watch(feedTime, (newFeedTime) => {
  feedSchedule.value = Array.from({length: newFeedTime}).fill('');

});

const currentTime = ref(['09', '00']);

const onClickLeft = () => history.back();


const allFeedingRecords = ref()
const feedingRecordsByTimes = ref()
const onFeedingSchedule = () => {
  getFeederSchedules().then(res => {
  })

  getFeederRecords().then(res => {
    allFeedingRecords.value = res.reverse().map((item: any) => {
      item.date = getDate(item.feedingDateTime)
      item.feedingDateTime = formattedTime(item.feedingDateTime)
      return item
    })
    const aggregated: { [key: string]: { date: string; times: number } } = {};
    allFeedingRecords.value.forEach((item: any) => {
      if (!aggregated[item.date]) {
        aggregated[item.date] = {
          date: item.date,
          times: 0
        };
      }
      aggregated[item.date].times++;
    })
    feedingRecordsByTimes.value = Object.values(aggregated);
    feedingRecordsByTimes.value.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
  })

}
onMounted(() => {
  onFeedingSchedule()
})
</script>
<style lang="less" scoped>
.home-schedule {
  height: 100%;
  background-color: #f4f4f5;

  &-content {
    background-color: #f4f4f5;
    margin-top: 45px;
    //padding: 10px 10px 60px 10px;
    padding-bottom: 60px;

    &-wrapper {
      background-color: #fff;
      border-radius: 10px;
      padding-bottom: 10px;

      &-avatar {
        display: flex;
        justify-content: center;
        align-items: center;

        &-img {
          width: 300px;
        }
      }

      &-chart {
      }

      .line {
        width: 100%;
        height: 10px;
        background-color: #eaeaeb;
      }
    }

    .loading {
      padding-top: 20px;
    }
  }

}
</style>
