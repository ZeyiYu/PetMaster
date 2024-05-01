<template>
  <div class="home-weight">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Vaccination Reminder"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="home-vaccination-content">
        <van-tabs v-model:active="active">
          <van-tab title="Upcoming">
            <div class="home-vaccination-content-list">
              <van-cell-group inset>
                <template v-for="item in upcoming">
                  <van-cell :title="item.title" :value="item.time"/>
                </template>
              </van-cell-group>
            </div>
          </van-tab>
          <van-tab title="Past">
            <div class="home-vaccination-content-list">
              <van-cell-group inset>
                <template v-for="item in past">
                  <van-cell :title="item.title" :value="item.time"/>
                </template>
              </van-cell-group>
            </div>
          </van-tab>
        </van-tabs>
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

const active = ref(0);
const chartStyle = ref({
  height: "",
  width: ""
});

const themeVars: ConfigProviderThemeVars = {
  //navBarBackground: '#f4f4f5',
};
const onClickLeft = () => history.back();
const upcoming = [
  {
    title: 'Lepto Annual (LWAH)',
    time: '7/16/2024'
  },
  {
    title: 'Lyme Annual (LWAH)',
    time: '7/16/2024'
  },
  {
    title: 'Heartworm/Lyme Test',
    time: '7/16/2024'
  },
  {
    title: 'Wellness Exam - ANNUAL',
    time: '8/21/2024'
  },
  {
    title: 'DHPP 3yr (combo)(LWAH)',
    time: '6/1/2025'
  },
  {
    title: 'Rabies 3yr (LWAH)',
    time: '6/1/2025'
  }
]
const past = [
  {
    title: 'Lepto Annual (LWAH)',
    time: '7/16/2023'
  },
  {
    title: 'Lyme Annual (LWAH)',
    time: '7/16/2023'
  },
  {
    title: 'Heartworm/Lyme Test',
    time: '7/16/2023'
  },
  {
    title: 'Wellness Exam - ANNUAL',
    time: '8/21/2023'
  },
  {
    title: 'DHPP 3yr (combo)(LWAH)',
    time: '6/1/2023'
  },
  {
    title: 'Rabies 3yr (LWAH)',
    time: '6/1/2023'
  }
]
</script>

<style lang="less" scoped>
.home-vaccination {
  height: 100%;
  background-color: #f4f4f5;

  &-content {
    margin-top: 50px;
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
