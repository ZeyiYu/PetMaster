<template>
  <div class="feeder">
    <van-config-provider :theme-vars="themeVars">
      <div class="feeder-info">
        <div class="feeder-info-top">
          <div>
            <img class="feeder-info-top-pic" src="/src/assets/image/feeder.jpg"/>
          </div>
          <div>
            <div class="line">
              <div class="font_s12 wrapper">
                <div class="font_s20 font_w500 title">{{ feedTarget }}<span class="font_s12 font_w300">G</span></div>
                <div class="font_w300 intro">Today's Feeding Amount</div>
              </div>
              <div class="circle flex_center_center" @click="activateFeeder">
                <van-circle
                    v-model:current-rate="food"
                    :rate="foodWeight"
                    :stroke-width="80"
                    size="35px"
                    layer-color="#dedfdf"
                    color="#92b95e"
                    :speed="80"
                />
                <div style="position: absolute;top:-11px;left:9px">
                  <Icon name="bone" size="14" color="#747474"></Icon>
                </div>
              </div>
            </div>
            <div class="line">
              <div class="font_s12 wrapper">
                <div class="font_s20 title">{{ feedTimes }}<span class="font_s12 font_w300">times</span></div>
                <div class="font_w300 intro">Today's Feeding Times</div>
              </div>
              <div class="circle flex_center_center">
                <van-circle
                    v-model:current-rate="wifi"
                    :rate="100"
                    :stroke-width="80"
                    size="35px"
                    layer-color="#dedfdf"
                    color="#92b95e"
                />
                <!--                <div style="position: absolute;top:-10px;left:8px">
                                  <Icon name="wifi" size="20" color="#747474"></Icon>
                                </div>-->
                <div style="position: absolute;top:-10px;left:8px">
                  <Icon name="wifi" size="20" color="#747474"></Icon>
                </div>
              </div>
            </div>
            <div class="line">
              <div class="font_s12 wrapper">
                <div class="font_s20 title">{{ nextFeedTime }}<span
                    class="font_s12 font_w300">{{ isAm ? 'AM' : 'PM' }}</span></div>
                <div class="font_w300 intro">Next feeding time</div>
              </div>
              <div class="circle flex_center_center">
                <van-circle
                    v-model:current-rate="water"
                    :rate="waterLevel"
                    :stroke-width="80"
                    size="35px"
                    layer-color="#dedfdf"
                    color="#92b95e"
                    :speed="80"
                />
                <div style="position: absolute;top:-11px;left:9px">
                  <Icon name="shuidi" size="18" color="#747474"></Icon>
                </div>
              </div>
            </div>
          </div>
          <div>
            <!--            <div class="circle">
                          <van-circle
                              v-model:current-rate="currentRate"
                              :rate="100"
                              :stroke-width="80"
                              size="30px"
                          />
                        </div>
                        <div class="circle">
                          <van-circle
                              v-model:current-rate="currentRate"
                              :rate="100"
                              :stroke-width="80"
                              size="30px"
                          />

                        </div>-->
          </div>
        </div>
        <div class="components">
          <div class="components-wrapper">
            <div class="components-wrapper-item" @click="router.push('/feedingSchedule')">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-baobiao"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Feeding Schedule
              </div>
            </div>
            <div class="components-wrapper-item" @click="showFeedMode = true">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-shijian"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Feeding Mode
              </div>
            </div>
            <van-action-sheet
                v-model:show="showFeedMode"
                :actions="actions"
                @select="onSelect"
                cancel-text="Cancel"
            />
            <div class="components-wrapper-item" @click="showFeedTarget = true">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-zuzhi"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Feeding Target
              </div>
            </div>
            <van-action-sheet v-model:show="showFeedTarget" title="Feeding Target">
              <div class="feeder-target">
                <div class="flex_center_center">
                  <img class="feeder-target-img"
                       src="src/assets/image/pet.png"/>
                </div>
                <div class="feeder-target-title flex_center_center">
                  Daily feeding amount
                </div>
                <div class="feeder-target-desc flex_center_center">
                  <div style="width: 240px;text-align: center">
                    The total amount of food dispensed to the pet every day.
                  </div>
                </div>
                <div>
                  <van-slider v-model="feedTarget" @change="onChange" :step="10" :max="500">
                    <template #button>
                      <div class="custom-button">{{ feedTarget }}</div>
                    </template>
                  </van-slider>
                </div>

              </div>
            </van-action-sheet>
            <div class="components-wrapper-item" @click="router.push('/feedingSummary')">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-touzi"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Feeding Summary
              </div>
            </div>
          </div>
        </div>
      </div>
      <Schedule></Schedule>
      <Courses></Courses>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {showConfirmDialog, showToast} from 'vant';
import {getParentSquare, getSquareCategory, getSquareDetail} from "@/assets/api/Social/SquareCategory";
import type {ConfigProviderThemeVars} from 'vant';
import Toast from "@/components/Toast";
import {
  getFeeder,
  getFeederDetails,
  getFeederSchedules,
  getWaterLevel,
  openFeeder,
  updateFeedingTarget
} from "@/assets/api/Feeder";

const router = useRouter()

const active = ref(0);
const themeVars: ConfigProviderThemeVars = {
  sidebarBackground: '#fff',
  sidebarWidth: '75px',
  sidebarPadding: '12px 20px',
  sidebarTextColor: '#646464',
  searchBackground: '#eeeeee',
  searchContentBackground: '#eeeeee'
};
const food = ref(0);
const foodWeight = ref(0);
const wifi = ref(0);
const water = ref(0);
const waterLevel = ref(0)

//打开喂食模式弹窗
const showFeedMode = ref(false);
//打开喂食目标弹窗
const showFeedTarget = ref(false);
const actions = [
  {name: 'Manual Feeding', subname: 'Allows users to manually dispense pet food.'},
  {name: 'Automatic Feeding', subname: ' Automatically dispenses pet food at set intervals.'}
];
const onSelect = (item: any) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  showFeedMode.value = false;
  Toast.success('Feeding mode is set to ' + item.name);
};

const feedTarget = ref('');
const feedTimes = ref('');
const nextFeedTime = ref('');
const isAm = ref(true)
const onChange = (value: any) => {
  updateFeedingTarget(value).then((res) => {
    Toast.success('Set target to: ' + value + 'g');
    location.reload()
  })
}

const activateFeeder = () => {

  showConfirmDialog({
    title: 'Single Feeding',
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Confirm',
    message:
        'Are you sure you want to feed once?',
  })
      .then(() => {
        openFeeder({amount: 20}).then(res => {
          Toast.success('Feeding successful')
        })
      })
      .catch(() => {
        // on cancel
      });
}


const onFeeder = () => {
  getFeeder().then(res => {
    console.log(res, 'cao')
    if (res.weight > 0) {
      foodWeight.value = res.weight / 600 * 100
    }
  })
  getWaterLevel().then(res => {
    waterLevel.value = res.waterlevel / 80 * 100
    console.log(res, 'cao')
  })
  getFeederDetails().then((res) => {
    feedTarget.value = res.everydayFoodPlan
  })
  getFeederSchedules().then((res) => {
    feedTimes.value = res.length
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    let closestTime = '';
    let minDifference = Infinity;
    res.forEach((item: any) => {
      const [hours, minutes] = item.feedingTime.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      let difference = totalMinutes - currentTotalMinutes;

      if (difference < 0) {
        difference += 24 * 60; // Add a day if time is earlier than current time
      }
      if (difference < minDifference) {
        minDifference = difference;
        closestTime = item.feedingTime;
      }

 /*     if (difference >= 0 && difference < minDifference) {
        minDifference = difference;
        closestTime = item.feedingTime;
        console.log('timeaaaa')

      } else {
        closestTime = res[0].feedingTime;
        minDifference = Math.abs(difference);
        console.log('timessss')
      }*/
    })

    const [hours, minutes, seconds] = closestTime.split(':').map(Number);
    isAm.value = true
    if (hours >= 12) {
      isAm.value = false
    }
    const displayHours = (hours > 12 ? hours - 12 : hours).toString().padStart(2, '0');
    nextFeedTime.value = `${displayHours}:${minutes.toString().padStart(2, '0')}`;
  })
}
onMounted(() => {
  onFeeder()
})
</script>

<style scoped lang="less">
.feeder {
  position: relative;
  padding: 8px 15px 70px 15px;
  background-color: #f4f4f5;

  .custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: var(--van-primary-color);
    border-radius: 100px;
  }

  &-info {
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 10px 10px 10px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);

    &-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;

      &-pic {
        width: 120px;
        border-radius: 10px;
      }

      .line {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .wrapper {
        margin-bottom: 5px;
      }

      .title {
        color: #404d56;
      }

      .intro {
        color: #a1a1a1;
      }

      .circle {
        margin-left: 15px;
        position: relative;
      }

    }
  }

  &-target {
    padding: 10px 20px 40px 20px;

    &-img {
      width: 200px;
    }

    &-title {
      font-weight: 400;
      font-size: 17px;
      color: #595959;
      margin-bottom: 10px;

    }

    &-desc {
      font-weight: 400;
      font-size: 14px;
      color: #969799;
      margin-bottom: 30px;
      //width: 200px;
    }

    &-btn {
      font-size: 14px;
      padding: 3px 10px 3px 10px;
      border-radius: 5px;
      background-color: transparent;
      border: 1px solid #1989fa;
      color: #1989fa;
      margin-left: 10px;
    }

  }

  .components {
    display: flex;
    justify-content: center;
    color: #595959;

    &-wrapper {
      width: 320px;
      height: 70px;

      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      &-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
          &-pic {
            height: 30px;
            width: 30px;
          }

        }

        .title {
          height: 32px;
          margin-top: 5px;
        }
      }
    }

  }

  .loading {
    padding-top: 30px;
  }
}
</style>
