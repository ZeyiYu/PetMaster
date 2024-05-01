<template>
  <div class="square">
    <div class="content">
      <van-tabs v-model:active="active" sticky>
        <van-tab title="Feeder">
          <Feeder></Feeder>
        </van-tab>
        <van-tab title="Posts">
          <div class="content-posts">
            <div v-for="item in allPosts" v-if="allPosts">
              <EachPost :postContent="item"></EachPost>
              <div class="line">
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="Reels">
          <Tiktok></Tiktok>
        </van-tab>
      </van-tabs>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {transContent} from "@/utils/tools";
import {getAllPosts} from "@/assets/api/Post";

const active = ref(0);

const onPosts = () => {
  getAllPosts().then(res=>{
    console.log(res,'aaaa')
  })
}

const allPosts = ref()
allPosts.value = [
  {
    pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost.JPG'],
    createTime: '2024-03-26',
    content: 'An Easy 30 Minute Dog Biscuit Recipe From Just 6 Ingredients! #dogs #doglovers #dogfriendly',
    nickname: 'Cat and Dog Tips',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar.jpg',
    mentioned: ['#dogs', '#doglovers', '#dogfriendly']
  },
  {
    pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost2.jpg', 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost3.jpg'],
    createTime: '2024-02-26',
    content: 'This #ChocolateDay please remember to keep your chocolate out of your dog\'s reach as even a small amount can be seriously dangerous for their health. If you think that your dog has managed to get hold of some chocolate, don\'t wait and see, get them to a vet straight away. #Pet24',
    nickname: 'Pethical',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar2.jpg',
    mentioned: ['#ChocolateDay', '#Pet24']
  },
  {
    pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost4.jpg'],
    createTime: '2024-01-14',
    content: 'Phoebe is an adorable girl who can be a little shy at first. She is a special pooch looking for a patient, understanding owner who can help her emerge from her shell💛 @DT_Bridgend',
    nickname: 'I Love Pets',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar3.jpg',
    mentioned: ['@DT_Bridgend']
  },
  {
    pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost5.jpg', 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost6.jpg'],
    createTime: '2023-12-15',
    content: 'In honour of #BritishSignLanguageWeek we wanted to share Solace\'s story 💛\n' +
        'This cute boy became deaf when he was a pup so his owner taught him sign language to train him. Sadly, after 7 years, due to illness, his owner had to make the difficult decision to hand him over to us. 👇',
    nickname: 'Dogs Trust 🐶💛',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar4.jpg',
    mentioned: ['#BritishSignLanguageWeek']
  },
  {
    pictureUrl: ['https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogPost7.jpg'],
    createTime: '2023-11-23',
    content: 'Now that Spring has sprung (kind of), here are our top tips to keep your garden dog friendly 🐶🌼🌤️<br>[Image description: An infographic containing information on how to keep your garden dog friendly. All info can be found in the link above.]',
    nickname: 'Guide Dogs',
    profilePhoto: 'https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar5.jpg',
    mentioned: ['#ChocolateDay', '#Pet24']
  }]
allPosts.value.map((item: any) => {
  transContent(item)
});

onMounted(() => {
  onPosts()
})
</script>

<style lang="less" scoped>
.square {
  height: 100vh;
  //overflow-y: hidden;
  background-color: #f4f4f5;
}

.content {
  &-posts {
    padding-bottom: 40px;
  }
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eaeaeb;
  border: none;
}

.footer {
  z-index: 1;
}
</style>
