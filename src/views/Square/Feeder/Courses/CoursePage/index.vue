<template>
  <div class="feature-classesVideo">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Course"
          left-arrow
          fixed
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="feature-classesVideo-content">
        <VideoPlayer id="test" ref="videoPlayer" class="video-player vjs-custom-skin"
                     :loop="false"
                     :playsinline="true"
                     fluid
                     controls
                     :autoplay="false"
                     :src="singleContent.courseVideoUrl">
        </VideoPlayer>
        <div class="desc font_s20 font_w500">
          <div>
            <span class="desc-title">
            {{ singleContent.courseTitle }}
            </span>
          </div>
          <div class="font_s18 font_w500" style="margin-top: 25px">
            Features
          </div>
          <div class="desc-detail font_s16 font_w300" style="color:#3F4F56;white-space: break-spaces;margin-top: 10px">
            {{ singleContent.courseFeatures }}
          </div>
          <div class="font_s18 font_w500" style="margin-top: 25px">
            Reviews
          </div>
          <div class="desc-detail font_s16 font_w300"
               style="margin-top: 10px">
            <van-rate v-model="singleContent.courseScore" allow-half color="#ffd21e"/>
          </div>
          <div class="font_s18 font_w500" style="margin-top: 25px">
            About
          </div>
          <div class="desc-detail font_s16 font_w300" style="color:#3F4F56;line-height:24px;white-space: break-spaces;margin-top: 10px">
            {{ singleContent.courseBrief }}
          </div>
        </div>
      </div>
      <Footer :active="1"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import 'video.js/dist/video-js.css'
import {VideoPlayer} from '@videojs-player/vue'

const route = useRoute()
const height = document.documentElement.clientHeight - 145
const themeVars: ConfigProviderThemeVars = {
  navBarIconColor: '#333333',
  navBarTextColor: '#333333',
  navBarTitleFontSize: '18px',
  navBarBackground: '#F7F7F7',
  tabsNavBackground: '#F7F7F7',
  tabFontSize: '18px'
};
const onClickLeft = () => history.back();
const videoContent = ref([
  {
    courseVideoUrl: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/courseVideo1.MP4',
    courseTitle: 'Pet Sitting and Dog Walking Walking',
    courseFeatures: 'Pet Care · Dog Walking Techniques',
    courseScore: 4,
    courseBrief: 'Pet Sitting and Dog Walking Walking" is a course video dedicated to exploring the essentials of pet care and dog walking services. It provides viewers with the necessary knowledge and skills to ensure proper care for pets when their owners are temporarily away or unable to attend to them. Covering topics such as basic pet care, dog walking techniques, safety measures, and client relationship management, this video equips participants with valuable insights into pet care practices and fosters responsible pet ownership.'
  },
  {
    courseVideoUrl: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/courseVideo2.MP4',
    courseTitle: 'How to master toilet training with your puppy',
    courseFeatures: 'Step-by-step · Practical · Demonstrative',
    courseScore: 4.5,
    courseBrief: 'This is a comprehensive course video dedicated to equipping pet owners with the knowledge and techniques needed to effectively toilet train their puppies. From understanding a puppy\'s natural instincts to implementing consistent training methods like crate training and positive reinforcement, this video provides step-by-step guidance and troubleshooting tips to ensure success. With practical demonstrations and expert advice, participants will gain the confidence and tools necessary to create a clean and comfortable environment for both their puppy and themselves.'
  },
  {
    courseVideoUrl: '',
    courseTitle: 'Pet first aid app and online courses',
    courseFeatures: 'Safety · Knowledge · Preparation',
    courseScore: 5,
    courseBrief:"Prioritize your furry friends' safety! Equip yourself with knowledge from the American Red Cross's pet first aid app and online courses. Remember, preparation is the best protection."
  },
  {
    courseVideoUrl: '',
    courseTitle: 'Perfect Pet Fitness Challenge: Keep Your Furry Friend Happy & Healthy!',
    courseFeatures: 'Active · Well-being · Engagement',
    courseScore: 3.5,
    courseBrief: "🐾 Let's kickstart a paw-some campaign focused on the well-being of our beloved pets! Introducing our Pet Fitness Challenge 🏆, where we encourage you to show us how you keep your furry friends active and healthy. 🌟"
  }])

const singleContent = ref()
singleContent.value = videoContent.value[parseInt(route.params.courseId[0]) - 1]

</script>

<style lang="less" scoped>
.feature-classesVideo {
  border-radius: 0 0 10px 10px;
  height: calc(100vh - 65px);
  overflow-y: scroll;

  .desc {
    position: relative;
    padding: 15px;
    width: 100%;
    height: 100%;

    &-title {
      position: relative;
    }

    &-title:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 8px;
      background: #7dcfc9;
      left: 0;
      bottom: 0;
      opacity: 0.3;
    }
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 40px;

    /deep/ .vjs-big-play-button {
      background-color: rgba(0, 0, 0, 0.4);
      border: none;
      font-size: 30px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 60%;
      left: 60%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
