<template>
  <div class="videos">
    <VideoPlayer id="test" ref="videoPlayer" class="video-player vjs-custom-skin"
                 @mounted="handleMounted"
                 @timeupdate="handleEvent(player?.currentTime())"
                 :loop="true"
                 :height="height"
                 :playsinline="true"
                 :control-bar="{
                  timeDivider: true, // 当前时间和持续时间的分隔符
                  durationDisplay: false, // 显示持续时间
                  remainingTimeDisplay: false, // 是否显示剩余时间功能
                  fullscreenToggle: false, // 是否显示全屏按钮
                  pictureInPictureToggle:false,
                  currentTimeDisplay: false,// 当前时间
                  volumeControl: false,// 声音控制键
                  playToggle: true, // 暂停和播放键
                  progressControl: false// 进度条
                 }"
                 :autoplay="isAutoPlay"
                 :src="props.videoList.videoUrl">
    </VideoPlayer>
  </div>
</template>

<script setup>
import {shallowRef} from 'vue'
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const player = shallowRef()
const playing = ref(true)
const height = document.documentElement.clientHeight - 95
const props = defineProps({
  videoList: {
    type: Object
  },
  dex: {
    type: Number,
    default: 0
  }
})
const handleMounted = (payload) => {
  player.value = payload.player
}

const handleEvent = (log) => {
}

const playOrStop = () => {
  if (playing.value) {
    player.value.pause()
    playing.value = false
  } else {
    player.value.play()
    playing.value = true
  }
}

//自动播放第一个视频
const isAutoPlay = ref(false)
const autoPlayAction = () => {
  if (props.dex == 0) {
    isAutoPlay.value = true
  }
}

const play = () => {
  player.value.play()
  playing.value = true
}

const stop = () => {
  player.value.pause()
  playing.value = false
}

onMounted(() => {
  autoPlayAction()
})

defineExpose({
  playOrStop,
  play,
  stop
});

</script>
<style scoped>
.videos {
  position: relative;
}

/deep/ .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  font-size: 30px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
</style>
