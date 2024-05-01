<template>
  <div class="home-summary">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Feeding Summary"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="home-summary-content">
        <div style="padding:15px 18px 10px 18px">
          <div class="home-summary-content-wrapper">
            <div style="padding: 15px 0 0 15px">
              <div style="color: #858489;font-size: 18px;font-weight: 500">
                AVERAGE
              </div>
              <div style="font-size: 26px;font-weight: 500;padding: 5px 0 5px 0">
                {{ averageAmount.toFixed(2) }}
                <span style="color: #858489;font-size: 18px;font-weight: 600;">G</span>
              </div>
              <div style="color: #858489;font-size: 18px;font-weight: 500;">
                PER DAY
              </div>
            </div>
            <div class="home-summary-content-wrapper-chart" id="main" style="height: 250px"></div>
            <div
                style="display: flex;justify-content: space-between;padding: 15px 15px 15px 15px;background-color: #f4f4f5;margin: 0 10px 0 10px;border-radius: 8px">
              <div style="font-size: 16px;font-weight: 300">
                Latest
              </div>
              <div style="font-size: 16px;font-weight: 500">
                {{ latestAmount }} <span style="color: #858489;">g</span>
              </div>
            </div>
          </div>
        </div>
        <div class="home-weight-content-list">
          <div class="font_s16" style="padding: 10px 0 10px 25px">
            All Recorded Data
          </div>
          <van-cell-group inset>
            <template v-for="item in allFeedingRecords">
              <van-cell :title="item.feedingDateTime" :value="item.foodAmount+'g'"/>
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
import {getFeederRecords} from "@/assets/api/Feeder";
import {formattedTime, getDate} from "@/utils/tools";
import {all} from "axios";

const chartStyle = ref({
  height: "",
  width: ""
});

const indexList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const list = [...Array(50).keys()];
const themeVars: ConfigProviderThemeVars = {
  //navBarBackground: '#f4f4f5',
};
const onClickLeft = () => history.back();

function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'));
  document.getElementById('main')!.style.width = window.innerWidth / 2 + "px";
  // 指定图表的配置项和数据
  const option = {
    color: [
      '#E4A140',
    ],
    tooltip: {
      formatter: 'Amount: {c}g'
    },
    xAxis: {
      data: weeklyDates.value,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
    },
    series: [
      {
        name: 'Amount',
        type: 'line',
        smooth: 'true',

        data: weeklyRecord.value
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

const weeklyRecord = ref([])
const weeklyDates = ref([])
const allFeedingRecords = ref()
const dailyData = ref()
const latestAmount = ref()
const averageAmount = ref(0)
const onFeedingRecords = () => {
  getFeederRecords().then(res => {
    allFeedingRecords.value = res.reverse().map((item: any) => {
      item.feedingDateTime = formattedTime(item.feedingDateTime)
      item.date = getDate(item.feedingDateTime)
      return item
    })

    allFeedingRecords.value.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

    const reversedArray = res.slice().reverse()
    const slicedArray = reversedArray.slice(0, res.length >= 7 ? 7 : res.length);
    let temp = slicedArray.map((item: any) => {
      return item;
    }).reverse()

    const aggregated: { [key: string]: { date: string; totalAmount: number } } = {};
    temp.forEach((item: any) => {
      averageAmount.value += item.foodAmount
      if (!aggregated[item.date]) {
        aggregated[item.date] = {
          date: item.date,
          totalAmount: 0
        };
      }
      aggregated[item.date].totalAmount += item.foodAmount;
    })
    dailyData.value = Object.values(aggregated).reverse();
    console.log(Object.values(aggregated).reverse(), '?')
    averageAmount.value = averageAmount.value / dailyData.value.length;
    latestAmount.value = dailyData.value[dailyData.value.length - 1].totalAmount
    weeklyRecord.value = dailyData.value.map((item: any) => {
      return parseFloat(item.totalAmount);
    })
    weeklyDates.value = dailyData.value.map((item: any) => {
      return item.date;
    })
    init()
  })
}
onMounted(() => {
  onFeedingRecords()
})

</script>

<style lang="less" scoped>
.home-summary {
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
