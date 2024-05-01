<template>
  <div class="home-calorie">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Activity"
          left-arrow
          fixed
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="content">
        <div class="content-top" v-if="latestData">
          <div class="content-top-wrapper">
            <div style="color: #f0174f">
              Calorie
            </div>
            <div class="content-top-wrapper-num">
              {{ latestData.calorie }}
              <span class="unit">
                kcal
              </span>
            </div>
            <div class="unit">
              Today
            </div>
          </div>
          <div class="vLine">
          </div>
          <div class="content-top-wrapper">
            <div style="color: #15ba5d">
              Exercise
            </div>
            <div class="content-top-wrapper-num">
              {{ latestData.exercise }}
              <span class="unit">min</span>
            </div>
          </div>
          <div class="vLine">
          </div>
          <div class="content-top-wrapper">
            <div style="color: #1e84f0">
              Move
            </div>
            <div class="content-top-wrapper-num">
              {{ latestData.move / 1000 }} <span class="unit">km</span>
            </div>
          </div>
        </div>
        <div class="content-chart">
          <div class="hLine"></div>
          <div>
            <div class="content-chart-title" style="color: #f0174f">Calorie</div>
            <div class="home-weight-content-wrapper-chart" id="calorie" style="height: 250px"></div>
          </div>
          <div class="hLine"></div>
          <div>
            <div class="content-chart-title" style="color: #15ba5d">Exercise</div>
            <div class="home-weight-content-wrapper-chart" id="exercise" style="height: 250px"></div>
          </div>
          <div class="hLine"></div>
          <div>
            <div class="content-chart-title" style="color: #1e84f0">Move</div>
            <div class="home-weight-content-wrapper-chart" id="move" style="height: 250px"></div>
          </div>
        </div>

        <!--        <div class="content-sos">
                  <div class="sos flex_center_center font_s18 font_w500" @click="sos">
                    一键求助
                  </div>
                </div>
                <div class="content-desc font_s16">
                  即将求助安全客服和紧急联系人
                </div>
                <div class="line">
                </div>
                <div class="content-contact font_w500 font_s18">
                  紧急联系人
                  &lt;!&ndash;          <template v-for="item in contactFile" v-if="contactFile">
                              <div class="content-contact-item">
                                <div class="left">
                                  <div class="item-info">
                                    <div class="item-info-top font_w400 font_s18">
                                      {{ item.name }}
                                    </div>
                                    <div class="font_s16 font_w300" style="color: #8e8e8e">
                                      {{ item.contract }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </template>&ndash;&gt;
                </div>-->
      </div>
      <Footer :active="1"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';

import {useUserStore} from "@/store/userInfo";
import Toast from "@/components/Toast";
import * as echarts from "echarts";
import {getFeederRecords, getFeederSchedules} from "@/assets/api/Feeder";
import {formattedTime, getDate} from "@/utils/tools";
import {getActivityList} from "@/assets/api/Activity";

const themeVars: ConfigProviderThemeVars = {
  //navBarIconColor: '#333333',
  //navBarTextColor: '#333333',
  navBarTitleFontSize: '18px',
  navBarBackground: '#F7F7F7'
};
const onClickLeft = () => history.back();

function init() {
  const calorie = echarts.init(document.getElementById('calorie'));
  const calorieOption = {
    color: [
      '#f0174f',
    ],
    tooltip: {
      formatter: 'Calorie: {c}kcal'
    },
    xAxis: {
      data: weeklyDate.value,
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
        name: 'Calorie',
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: [6, 6, 0, 0],
          }
        },
        data: weeklyCalorie.value
      }
    ]
  };
  calorie.setOption(calorieOption);

  const exercise = echarts.init(document.getElementById('exercise'));
  const exerciseOption = {
    color: [
      '#15ba5d',
    ],
    tooltip: {
      formatter: 'Calorie: {c}kcal'
    },
    xAxis: {
      data: weeklyDate.value,
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
        name: 'Calorie',
        type: 'bar',
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: [6, 6, 0, 0],
          }
        },
        barWidth: '50%',
        data: weeklyExercise.value
      }
    ]
  };
  exercise.setOption(exerciseOption);

  const move = echarts.init(document.getElementById('move'));
  const moveOption = {
    color: [
      '#1e84f0',
    ],
    tooltip: {
      formatter: 'Calorie: {c}kcal'
    },
    xAxis: {
      data: weeklyDate.value,
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
        name: 'Calorie',
        type: 'bar',
        itemStyle: {
          normal: {
            //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
            barBorderRadius: [6, 6, 0, 0],
          }
        },
        barWidth: '50%',
        data: weeklyMove.value
      }
    ]
  };
  move.setOption(moveOption);
}

const weeklyCalorie = ref([])
const weeklyDate = ref([])
const weeklyExercise = ref([])
const weeklyMove = ref([])

const latestData = ref()
const onActivityPage = () => {
  getActivityList().then(res => {
    const reversedArray = res.slice().reverse()
    const slicedArray = reversedArray.slice(0, res.length >= 7 ? 7 : res.length);
    let temp = slicedArray.map((item: any) => {
      item.date = getDate(item.date)
      return item;
    }).reverse()

    weeklyCalorie.value = temp.map((item: any) => {
      return item.calorie;
    })
    weeklyDate.value = temp.map((item: any) => {
      return item.date;
    })

    weeklyExercise.value = temp.map((item: any) => {
      const match = item.exercise.match(/PT(\d+H)?(\d+M)?/);
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      return hours * 60 + minutes;
    })

    weeklyMove.value = temp.map((item: any) => {
      return item.move / 1000;
    })
    temp.forEach((item: any) => {
      const match = item.exercise.match(/PT(\d+H)?(\d+M)?/);
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      item.exercise = hours * 60 + minutes;
    })
    latestData.value = temp[temp.length - 1]
    console.log(latestData.value, 'a')
    init()
  })


}


onMounted(() => {
  onActivityPage()
})
/*const userStore = useUserStore()
const onClickLeft = () => history.back();
const {location} = useEmergency()

//紧急联系人档案
const contactFile = ref()
const onEmergency = async () => {
  const contact = await getHealthFiles({userId: userStore.userId})
  contactFile.value = contact.filter((item: any) => {
    return item.relation !== '本人'
  })
}

//点击一键求助
const sos = () => {
  sendEmergency({
    location: location.value,
    event: ''
  }).then(res => {
    Toast.success('发送紧急求助成功！')
  })
}

onMounted(() => {
  onEmergency()
})*/
</script>

<style lang="less" scoped>
.home-calorie {
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
  position: relative;

  .content {
    position: relative;
    padding: 45px 0 20px 0;

    &-top {
      padding: 20px 0 0 20px;
      display: flex;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;

      &-wrapper {
        margin-right: 15px;

        &-num {
          font-size: 20px;
        }

        .unit {
          color: #858489;
          font-size: 16px;
        }
      }
    }

    &-chart {
      padding: 0 20px;

      &-title {
        font-size: 16px;
        font-weight: 500;
      }
    }

    &-map {
      display: flex;
      justify-content: center;

      #container {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 400px;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
      }
    }

    .vLine {
      margin: 0 10px 0 0;
      border-left: 1px solid #d3d3d5;
      width: 4px;
      height: 45px;
    }

    .hLine {
      width: 100%;
      height: 1px;
      background-color: #eaeaeb;
      border: none;
      margin-bottom: 10px;
    }

    &-desc {
      text-align: center;
      margin: 25px 0 20px 0;
    }

    &-sos {
      margin-top: 30px;
      position: relative;
      display: flex;
      justify-content: center;

      .sos {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #EB4D3E;
        border-radius: 50%;
        color: #fff;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
        -webkit-animation-name: scaleDraw;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-duration: 2s;
      }

      @keyframes scaleDraw {
        0% {
          transform: scale(1);
        }
        25% {
          transform: scale(1.25);
        }
        50% {
          transform: scale(1);
        }
        75% {
          transform: scale(1.1);
        }
      }
    }

    &-contact {
      margin: 0 0 0 20px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 10px 0;

        &-info {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
