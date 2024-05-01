<template>
  <div class="message-item">
    <div class="item">
      <div class="item-avatar">
<!--
        <img class="item-avatar-pic" :src="messageItem.profilePhoto"/>
-->
        <img class="item-avatar-pic" :src="messageItem.avatar"/>
      </div>
      <div class="item-info" @click="router.push({name:'chat',params:{otherId:messageItem.id,userId:self}})">
        <div class="item-info-top font_s16">
          <div class="font_s14">
            {{ messageItem.nickname }}
          </div>
          <div class="font_s12 font_w300" style="color:#8e8e8e;">
            {{ messageItem.createTime }}
          </div>
        </div>
        <div class="font_s14 font_w300" style="color: #8e8e8e">
          {{ cutString(messageItem.message,40) }}
        </div>
<!--        <van-divider></van-divider>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, Ref} from "vue";
import {useUserStore} from "@/store/userInfo";
import {getChatHistory} from "@/assets/api/Chat";
import {cutString} from "@/utils/tools";

const router = useRouter()

interface IMessageItem {
  id: number,
  nickname: string,
  createTime: string,
  profilePhoto: string,
  personalStatus: string
}

const props = defineProps({
  messageItem: {
    type: Object as PropType<IMessageItem>
  }
})

const messageItem: Ref<IMessageItem | undefined> = ref()
messageItem.value = props.messageItem

const userStore = useUserStore()
const self: Ref<number | undefined> = ref()
self.value = userStore.userId
const message = ref()
message.value = {message:'Test'}
/*const onMessageItem = async () => {
  const temp = await getChatHistory({fromUserId: self.value, toUserId: props.messageItem!.id})
  let len = temp.length
  message.value = temp[len - 1]
}
onMounted(() => {
  onMessageItem()
})*/
</script>

<style lang="less" scoped>
.message-item {
  .item {
    display: flex;
    padding: 5px 0 10px 0;
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
      border-bottom: 0.5px solid #eee;
      padding-bottom: 10px;

      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

}
</style>
