<template>
  <div class="message">
    <van-tabs v-model:active="active">
      <van-tab title="Notifications">
        <Dynamic></Dynamic>
      </van-tab>
      <van-tab title="Messages">
        <div style="height:20px;" class="search flex_center_center">
          <van-field
              v-model="searchMessage"
              rows="1"
              autosize
              type="textarea"
              placeholder="Search"
              input-align="center"
              class="search-input"
          />
        </div>
        <div class="messageWrapper">
          <MessageComp></MessageComp>
          <div v-for="item in messageList" v-if="messageList">
            <MessageItem :messageItem=item></MessageItem>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {useUserStore} from "@/store/userInfo";
import {getChatList} from "@/assets/api/Chat";

const searchMessage = ref()
const active: Ref<number> = ref(1);
const messageList = ref()
const userStore = useUserStore()
messageList.value = [
  {
    nickname: 'George Littel',
    createTime: '2024-03-27',
    message: "Let's walk the dog together tomorrow!",
    avatar: "https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar3.jpg"
  },
  {
    nickname: 'Jordan Yarrow',
    createTime: '2024-02-17',
    message: "I've been experimenting with homemade dog treats lately!",
    avatar: "https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar5.jpg"
  },
  {
    nickname: 'Jac Yarrow',
    createTime: '2024-01-23',
    message: "Isn't it amazing how dogs have this incredible ability to sense our emotions and just be there for us",
    avatar: "https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar2.jpg"
  },
  {
    nickname: 'Leo Woodall',
    createTime: '2023-12-25',
    message: 'Merry Christmas, Zack!',
    avatar: "https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar4.jpg"
  },
  {
    nickname: 'Frederic Bittner',
    createTime: '2023-11-23',
    message: "What's the funniest memorable thing your dog has ever done",
    avatar: "https://seniorassistant.oss-cn-hangzhou.aliyuncs.com/oss-img-path/dogAvatar.jpg"
  },


]
/*const onMessage = async () => {
  messageList.value = await getChatList({userId: userStore.userId})
}
onMounted(() => {
  onMessage()
})*/
</script>

<style lang="less" scoped>
.message {
  padding: 0 20px;

  .search {
    margin: 25px 0 20px 0;

    &-input {
      background-color: #eee;
      border-radius: 10px;
      height: 40px;
      width: 360px;
    }
  }

  .messageWrapper {
    padding-top: 10px;
  }
}
</style>
