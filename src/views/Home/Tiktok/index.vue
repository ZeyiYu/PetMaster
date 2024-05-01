<template>
  <div class="home-content" v-if="videoList">
    <div class="info">
      <div class="font_s14 font_w300">{{ videoList[videoIndex].videoBrief }}</div>
    </div>
    <div class="review">
      <div class="review-avatar flex_center_center">
        <img :src="videoList[videoIndex].profilePhoto" alt="" class="review-avatar-img">
        <div class="font_s14 review-avatar-author">
          {{ videoList[videoIndex].nickname }}
        </div>
      </div>
      <div class="review-right">
        <div class="review-right-item">
          <div class="flex_center_center right" @click="clickLikeVideo">
            <Icon v-if="videoList[videoIndex].isLike" name="liked" color="#EA3E4A" size="24"></Icon>
            <Icon v-else name="like" size="24" color="#fff"></Icon>
          </div>
          <div class="font_s12 font_w300 flex_center_center">
            {{ videoList[videoIndex].thumbsUpCount }}
          </div>
        </div>
        <div class="review-right-item" @click="show = true;">
          <div class="flex_center_center right">
            <Icon name="comment" size="24" color="#fff"></Icon>
          </div>
          <div class="font_s12 font_w300 flex_center_center">
            {{ videoList[videoIndex].videoCommentCount }}
          </div>
        </div>
      </div>
    </div>
    <div class="swiper">
      <swiper
          :direction="'vertical'"
          :space-between="50"
          :grab-cursor="true"
          :set-wrapper-size="true"
          :slides-per-view="1"
          :mousewheel="true"
          :resistance-ratio="0"
          :observe-parents="true"
          :height="deviceHeight"
          :auto-height="true"
          @tap="tap"
          @slideNextTransitionStart="slideNextTransitionStart"
          @slidePrevTransitionEnd="slidePrevTransitionEnd"
      >
        <swiper-slide v-for="(item,index) in videoList" :key="index">
          <div>
            <Player ref="videos" :videoList="item" :dex="index"></Player>
          </div>
          <!--          <div class="info">
                      <div class="font_s14 font_w300">{{ item.videoBrief }}</div>
                    </div>
                    <div class="review">
                      <div class="review-avatar flex_center_center">
                        <img :src="item.profilePhoto" alt="" class="review-avatar-img">
                        <div class="font_s14 review-avatar-author">
                          {{ item.nickname }}
                        </div>
                      </div>
                      <div class="review-right">
                        <div class="review-right-item">
                          <div class="flex_center_center right" @click="clickLikeVideo">
                            <Icon v-if="videoList[videoIndex].isLike" name="liked" color="#EA3E4A" size="24"></Icon>
                            <Icon v-else name="like" size="24" color="#fff"></Icon>
                          </div>
                          <div class="font_s12 font_w300 flex_center_center">
                            {{ videoList[videoIndex].thumbsUpCount }}
                          </div>
                        </div>
                        <div class="review-right-item" @click="show = true;">
                          <div class="flex_center_center right">
                            <Icon name="comment" size="24" color="#fff"></Icon>
                          </div>
                          <div class="font_s12 font_w300 flex_center_center">
                            {{ videoList[videoIndex].videoCommentCount }}
                          </div>
                        </div>
                      </div>
                    </div>-->
        </swiper-slide>
      </swiper>
    </div>
    <van-action-sheet v-model:show="show" title="Comments">
      <div class="content">
        <template v-for="item in videoList[videoIndex].comments" :key="item.id">
          <VideoComment :videoComment="item"></VideoComment>
        </template>
        <div class="comment flex_center_center font_s16">
          <input
              class="comment-input"
              placeholder="Add Comment..."
              v-model="review"
              @keyup.enter="sendReview"
          />
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import Player from "@/views/Home/Tiktok/Player/index.vue";
import {getVideoList} from "@/assets/api/Video/VideoItem/index.js";
import {getUserInfoById} from "@/assets/api/Social/User";
import {Ref} from "vue";
import {commentVideo, getVideoCommentCount, getVideoComments} from "@/assets/api/Video/VideoComment";
import {getVideoLikeCount, isUserLikeVideo, likeVideo, unlikeVideo} from "@/assets/api/Video/VideoLike";
import {useUserStore} from "@/store/userInfo";
import {getNowDate} from "@/utils/tools";
import Toast from "@/components/Toast";

const deviceHeight = ref()
deviceHeight.value = window.innerHeight

const show: Ref<boolean> = ref(false)
const videoIndex = ref(0)
const userStore = useUserStore()

const videoList = ref()
videoList.value = [
  {
    videoUrl: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogVideo.MP4',
    nickname: 'Amelia the Dog Trainer',
    videoBrief: 'The last one is VERY important to remember #dogfacts #animalfact',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar.jpg',
    comments: {},
    videoCommentCount: 42,
    thumbsUpCount: 56,
    isLike: true
  },
  {
    videoUrl: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogVideo2.MP4',
    videoBrief: 'Puppy Biting #DogTraining #puppytips #dogtrainer',
    nickname: 'Wild Dogs',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar2.jpg',
    comments: {},
    videoCommentCount: 132,
    thumbsUpCount: 25,
    isLike: true
  }
]
const onTikTok = async () => {
  videoList.value = await getVideoList()
  videoList.value.forEach((item: any) => {
    getUserInfoById(item.userId).then(res => {
      item.nickname = res.nickname
      item.profilePhoto = res.profilePhoto
    })
    getVideoComments(item.id).then(res => {
      item.comments = res
    })
    getVideoCommentCount(item.id).then(res => {
      item.videoCommentCount = res.videoCommentCount
    })
    getVideoLikeCount(item.id).then(res => {
      item.thumbsUpCount = res.thumbsUpCount
    })
    isUserLikeVideo({userId: userStore.userId, videoId: item.id}).then(res => {
      if (res.length !== 0) {
        item.isLike = true
      } else {
        item.isLike = false
      }
    })
    console.log(videoList.value)
  })
}
onMounted(() => {
  /*onTikTok()*/
})


//点赞视频
const clickLikeVideo = () => {
  const temp = videoList.value[videoIndex.value]
  if (temp.isLike === true) {
    unlikeVideo({userId: userStore.userId, videoId: temp.id}).then(res => {
      videoList.value[videoIndex.value].isLike = false
      videoList.value[videoIndex.value].thumbsUpCount--
    })
  } else {
    likeVideo({userId: userStore.userId, videoId: temp.id}).then(res => {
      videoList.value[videoIndex.value].isLike = true
      videoList.value[videoIndex.value].thumbsUpCount++
    })
  }
}

//发表评论
const review = ref()
const sendReview = () => {
  console.log(videoList.value[videoIndex.value].id, review.value)
  commentVideo({
    userId: userStore.userId,
    videoId: videoList.value[videoIndex.value].id,
    comment: review.value
  }).then(res => {
    let tempComment = {
      videoId: videoList.value[videoIndex.value].id,
      comment: review.value,
      createTime: getNowDate(),
      isDeleted: 0,
      updateTime: getNowDate(),
      userId: userStore.userId
    }
    videoList.value[videoIndex.value].comments.unshift(tempComment)
    Toast.success('评论成功')
    review.value = ''
    videoList.value[videoIndex.value].videoCommentCount++
  })
}

//当前第几个视频
const page = ref(1)

//video的节点
const videos: Ref<any> = ref(null);

const playAction = (index: number) => {
  videos.value[index].playOrStop()
}

//下滑
const nextVideo = (index: number) => {
  videos.value[index - 1].stop()
  videos.value[index].play()
}

//上滑
const prevVideo = (index: number) => {
  videos.value[index + 1].stop()
  videos.value[index].play()
}

//点击视频暂停或播放
const tap = () => {
  playAction(page.value - 1)
}

const slideNextTransitionStart = () => {
  page.value += 1
  nextVideo(page.value - 1)
  videoIndex.value++
}

const slidePrevTransitionEnd = () => {
  if (page.value > 1) {
    page.value -= 1
    prevVideo(page.value - 1)
    videoIndex.value--
  }
}
</script>
<style lang="less" scoped>
.home-content {
  background-color: #000;

  .swiper {
    //margin-top: 5px;
    overflow-y: hidden;
    height: calc(100vh - 95px)
  }

  .info {
    color: #fff;
    position: absolute;
    bottom: 70px;
    margin-left: 15px;
    z-index: 100;
    padding-right: 15px;
  }

  .review {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 10;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.1);
    height: 60px;
    color: #fff;

    &-avatar {
      &-img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }

      &-author {
        margin-left: 8px;
      }
    }

    &-right {
      display: flex;
      align-items: center;
      width: 80px;
      justify-content: space-between;
      z-index: 10000;
    }
  }

  .content {
    position: relative;
    padding: 10px;
  }

  .comment {
    &-input {
      width: calc(100% - 10px);
      height: 36px;
      padding: 0 10px;
      border-radius: 10px;
      background-color: #eee;
      font-size: 14px;
    }
  }
}
</style>
