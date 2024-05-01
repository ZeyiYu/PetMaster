<template>
  <div class="dynamic-item">
    <van-config-provider :theme-vars="themeVars">
      <div class="item">
        <div class="item-avatar">
<!--
          <img class="item-avatar-pic" src="@/assets/image/avatar.jpeg"/>
-->
          <svg class="icon-pic" aria-hidden="true"
               style="width: 35px;height: 35px;">
            <use xlink:href="#icon-alert"></use>
          </svg>
        </div>
        <div class="item-info">
          <div class="item-info-top font_s16">
            <div class="font_s14">
              <span style="color:#69696a">Alert</span>
            </div>
            <div class="font_s12 font_w300" style="color:#8e8e8e;">
              2022-08-04
            </div>
          </div>
          <div class="item-info-desc font_s14 font_w300" style="color: #8e8e8e">
            Your pet seems to have gone out without
            you knowing.
          </div>
<!--          <div class="item-info-photos">
            <van-grid :border="false" square center>
              <van-grid-item v-for="value in 4" :key="value">
                <van-image
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
                />
              </van-grid-item>
            </van-grid>
          </div>-->
          <van-divider></van-divider>
        </div>
      </div>


      <div class="item">
        <div class="item-avatar">
          <!--
                    <img class="item-avatar-pic" src="@/assets/image/avatar.jpeg"/>
          -->
          <svg class="icon-pic" aria-hidden="true"
               style="width: 35px;height: 35px;">
            <use xlink:href="#icon-reminder"></use>
          </svg>
        </div>
        <div class="item-info">
          <div class="item-info-top font_s16">
            <div class="font_s14">
              <span style="color:#69696a">Vaccination</span>
            </div>
            <div class="font_s12 font_w300" style="color:#8e8e8e;">
              2022-08-04
            </div>
          </div>
          <div class="item-info-desc font_s14 font_w300" style="color: #8e8e8e">
            You need to take your pet for vaccination
            next week.
          </div>
          <!--          <div class="item-info-photos">
                      <van-grid :border="false" square center>
                        <van-grid-item v-for="value in 4" :key="value">
                          <van-image
                              src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
                          />
                        </van-grid-item>
                      </van-grid>
                    </div>-->
          <van-divider></van-divider>
        </div>



      </div>

      <div class="item">
        <div class="item-avatar">
          <!--
                    <img class="item-avatar-pic" src="@/assets/image/avatar.jpeg"/>
          -->
          <svg class="icon-pic" aria-hidden="true"
               style="width: 35px;height: 35px;">
            <use xlink:href="#icon-qianshuzhaiyao"></use>
          </svg>
        </div>
        <div class="item-info">
          <div class="item-info-top font_s16">
            <div class="font_s14">
              <span style="color:#69696a">Summary</span>
            </div>
            <div class="font_s12 font_w300" style="color:#8e8e8e;">
              2022-08-04
            </div>
          </div>
          <div class="item-info-desc font_s14 font_w300" style="color: #8e8e8e">
            Your pet's health report has been generated.
          </div>
          <!--          <div class="item-info-photos">
                      <van-grid :border="false" square center>
                        <van-grid-item v-for="value in 4" :key="value">
                          <van-image
                              src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
                          />
                        </van-grid-item>
                      </van-grid>
                    </div>-->
          <van-divider></van-divider>
        </div>



      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';

const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};
</script>

<style lang="less" scoped>
.dynamic-item {
  .item {
    display: flex;

    &-avatar {
      &-pic {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &-info {
      margin-left: 10px;
      width: 100%;

      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-desc {
        margin-top: 2px;
      }

      &-photos {
        margin-top: 0px
      }
    }
  }

}
</style>
