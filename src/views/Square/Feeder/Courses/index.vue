<template>
  <div class="feed-courses">
    <van-config-provider :theme-vars="themeVars">
      <div class="courses">
        <div class="courses-title">
          <div class="font_s14">
            <div class="flex_center_center">
              <div style="margin-right: 8px;position:relative;top: -1px">
                <Icon name="shoucang1" color="#f4662f" size="16"></Icon>
              </div>
              <div style="color: #e4a140">
                Pet Courses
              </div>
            </div>
          </div>
          <div class="flex_center_center">
            <Icon name="rightarrow" size="14"></Icon>
          </div>
        </div>
        <div class="courses-content">
          <div class="courses-content-row">
            <div class="courses-content-row-wrapper" @click="router.push({name:'coursePage',params:{courseId:1}})">
              <img class="courses-content-row-wrapper-pic"
                   src="https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogCourse1.jpg" alt=""/>
              <div class="courses-content-row-wrapper-title">{{ cutString('Pet Sitting and Dog Walking', 17) }}</div>
              <div class="courses-content-row-wrapper-desc">
                <div class="txt">{{ cutString('Pet Sitting and Dog Walking Walking Walking', 28) }}</div>
                <div class="icon">
                  <div class="flex_center_center">
                    <Icon name="seen" size="13" color="#747474"></Icon>
                  </div>
                  <span class="icon-num">63</span>
                </div>
              </div>
            </div>
            <div class="courses-content-row-wrapper" @click="router.push({name:'coursePage',params:{courseId:2}})">
              <img class="courses-content-row-wrapper-pic"
                   src="https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogCourse2.jpeg"/>
              <div class="courses-content-row-wrapper-title">
                {{ cutString('How to master toilet training with your puppy', 17) }}
              </div>
              <div class="courses-content-row-wrapper-desc">
                <div class="txt">{{
                    cutString('Mastering toilet training with your puppy is essential for a harmonious and hygienic living environment', 28)
                  }}
                </div>
                <div class="icon">
                  <div class="flex_center_center">
                    <Icon name="seen" size="13" color="#747474"></Icon>
                  </div>
                  <span class="icon-num">49</span>
                </div>
              </div>
            </div>
            <div class="courses-content-row-wrapper" @click="router.push({name:'coursePage',params:{courseId:3}})">
              <img class="courses-content-row-wrapper-pic" src="https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogCourse3.jpg"/>
              <div class="courses-content-row-wrapper-title">{{ cutString('Pet first aid app and online courses', 17) }}</div>
              <div class="courses-content-row-wrapper-desc">
                <div class="txt">{{ cutString("Prioritize your furry friends' safety! Equip yourself with knowledge from the American Red Cross's pet first aid app and online courses. Remember, preparation is the best protection.", 28) }}</div>
                <div class="icon">
                  <div class="flex_center_center">
                    <Icon name="seen" size="13" color="#747474"></Icon>
                  </div>
                  <span class="icon-num">77</span>
                </div>
              </div>
            </div>
            <div class="courses-content-row-wrapper" @click="router.push({name:'coursePage',params:{courseId:4}})">
              <img class="courses-content-row-wrapper-pic" src="https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogCourse4.jpg"/>
              <div class="courses-content-row-wrapper-title">{{ cutString('Perfect Pet Fitness Challenge: Keep Your Furry Friend Happy & Healthy!', 17) }}</div>
              <div class="courses-content-row-wrapper-desc">
                <div class="txt">{{ cutString("🐾 Let's kickstart a paw-some campaign focused on the well-being of our beloved pets! Introducing our Pet Fitness Challenge 🏆, where we encourage you to show us how you keep your furry friends active and healthy. 🌟", 28) }}</div>
                <div class="icon">
                  <div class="flex_center_center">
                    <Icon name="seen" size="13" color="#747474"></Icon>
                  </div>
                  <span class="icon-num">94</span>
                </div>
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
import {useUserStore} from "@/store/userInfo";
import {cutString} from "@/utils/tools";

const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};


</script>

<style lang="less" scoped>
.feed-courses {
  background-color: #f4f4f5;

  .courses {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 15px 5px 15px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #595959;
    }

    &-content {
      margin: 15px 0 10px 0;
      display: flex;
      justify-content: space-between;

      &-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;

        &-wrapper {
          width: 150px;
          border: 1px solid #eee;
          margin-bottom: 10px;
          border-radius: 8px;
          padding-bottom: 10px;

          &-pic {
            width: 150px;
            height: 95px;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
          }

          &-title {
            padding: 0 10px;
            font-size: 14px;
            color: #3f4f56;
          }

          &-desc {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            color: #a1a1a0;
            padding: 3px 10px 0 10px;

            .txt {
              font-size: 12px;
            }

            .icon {
              display: flex;
              align-items: center;

              &-num {
                margin-left: 3px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
