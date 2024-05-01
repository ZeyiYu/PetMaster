<template>
  <div class="home-weight">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Weight Monitoring"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="home-weight-content">
        <div style="padding:15px 18px 10px 18px">
          <div class="home-weight-content-wrapper">
            <div style="padding: 15px 0 0 15px">
              <div style="color: #858489;font-size: 18px;font-weight: 500">
                RANGE
              </div>
              <div style="font-size: 26px;font-weight: 500;padding: 5px 0 5px 0">
                {{ (lowWeight / 1000).toFixed(2) }}-{{ (highWeight / 1000).toFixed(2) }}
                <span style="color: #858489;font-size: 18px;font-weight: 600;">KG</span>
              </div>
              <div style="color: #858489;font-size: 18px;font-weight: 500;">
                In a month
              </div>
            </div>
            <div class="home-weight-content-wrapper-chart" id="main" style="height: 250px"></div>
            <div
                style="display: flex;justify-content: space-between;padding: 15px 15px 15px 15px;background-color: #f4f4f5;margin: 0 10px 0 10px;border-radius: 8px">
              <div style="font-size: 16px;font-weight: 300">
                Latest: {{ latestTime }}
              </div>
              <div style="font-size: 16px;font-weight: 500">
                {{ latestWeight }} <span style="color: #858489;">kg</span>
              </div>
            </div>
          </div>
        </div>
        <div class="home-weight-content-list">
          <div class="font_s16" style="padding: 10px 0 10px 25px">
            All Recorded Data
          </div>

          <van-cell-group inset>
            <template v-for="item in weightRecord">
              <van-cell :title="item.recordDateTime" :value="item.weight"/>
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
import {getAllWeight, getLatestWeight} from "@/assets/api/PetInfo";
import {formattedTime} from "@/utils/tools";


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
  const myChart = echarts.init(document.getElementById('main'));
  document.getElementById('main')!.style.width = window.innerWidth / 2 + "px";
  // 指定图表的配置项和数据
  const option = {
    color: [
      '#E4A140',
    ],
    tooltip: {
      formatter: 'Weight: {c}kg'
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
        name: 'Weight',
        type: 'line',
        smooth: 'true',
        data: weeklyRecord.value
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

const latestWeight = ref('')
const latestTime = ref('')
const weightRecord = ref([])
const weeklyRecord = ref([])
const weeklyDates = ref([])
const lowWeight = ref('')
const highWeight = ref(0)
const onWeightPage = async () => {
  await getAllWeight().then((res) => {
    let lowest = Number.MAX_VALUE
    weightRecord.value = res.reverse().map((item: any) => {
      if (item.weight < lowest) {
        lowest = item.weight
      }
      if (item.weight > highWeight.value) {
        highWeight.value = item.weight
      }
      item.recordDateTime = formattedTime(item.recordDateTime)
      item.weight = (item.weight / 1000).toFixed(2).toString() + 'KG'
      return item
    })
    lowWeight.value = lowest.toString()
  });

  await getAllWeight().then((res) => {
    const reversedArray = res.slice().reverse()
    const slicedArray = reversedArray.slice(0, res.length >= 7 ? 7 : res.length);
    let temp = slicedArray.map((item: any) => {
      item.recordDateTime = formattedTime(item.recordDateTime)
      item.weight = item.weight / 1000;
      return item;
    }).reverse()
    weeklyRecord.value = temp.map((item: any) => {
      return parseFloat(item.weight);
    })
    weeklyDates.value = temp.map((item: any) => {
      const dateObj = new Date(item.recordDateTime);
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始计数，所以要加1
      const day = dateObj.getDate().toString().padStart(2, '0');
      return `${month}-${day}`;
    })
  });
  await getLatestWeight().then((res) => {
    latestWeight.value = (res.weight / 1000).toFixed(2).toString()
    latestTime.value = formattedTime(res.recordDateTime)
  })
  init()

}
onMounted(() => {
  onWeightPage()
  //chartStyle.value.width = window.innerWidth / 2 + "px"
})

</script>

<style lang="less" scoped>
.home-weight {
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
