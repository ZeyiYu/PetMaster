<template>
  <div class="chat" v-if="msgs && self && other && expertId">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          :title="other.nickname"
          @click-left="onClickLeft"
          @click-right="endService"
          fixed
      >
        <template #left>
          <Icon name="xiangzuojiantou" size="16" color="#747474"></Icon>
        </template>
        <template #right v-if="loginUserId === expertId">
          <Icon name="jieshushijian" size="24" color="#DC594F"></Icon>
        </template>
      </van-nav-bar>
      <div class="chat-wrapper">
        <div class="chat-wrapper-content">
          <div class="each" v-for="(item,index) in msgs" :id="'msg' + index">
            <div class="chat-wrapper-content-time font_s16">{{ item.createTime }}</div>
            <div v-if="item.userId !== userId && item.type === 4" class="chat-wrapper-content-item">
              <div class="chat-wrapper-content-item-avatar">
                <img class="chat-wrapper-content-item-avatar-pic" :src="other.profilePhoto" alt=""/>
              </div>
              <div class="chat-wrapper-content-item-message font_s16">
                {{ item.message }}
              </div>
            </div>
            <div v-if="item.userId === userId && item.type === 4" class="chat-wrapper-content-item right">
              <div class="chat-wrapper-content-item-avatar">
                <img class="chat-wrapper-content-item-avatar-pic" :src="self.profilePhoto" alt=""/>
              </div>
              <div class="chat-wrapper-content-item-message rightTxt font_s16">
                {{ item.message }}
              </div>
            </div>
          </div>
        </div>
        <div class="sendWrapper">
          <input class="sendWrapper-msg" type="text" v-model="chatContent" @keyup.enter="onSubmit">
          <button class="sendWrapper-btn font_s16" type="button" @click="onSubmit">
            发送
          </button>
        </div>
      </div>
      <Footer :active="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ConfigProviderThemeVars, showConfirmDialog} from "vant";
import {useChat} from "../Chat/useChat";
import {getNowDate} from "@/utils/tools";
import {useUserStore} from "@/store/userInfo";
import {endAppoint, getAppointHistory, saveAppoint} from "@/assets/api/Appoint/AppointHistory";
import Toast from "@/components/Toast";
import eventBus from "@/utils/eventBus";

const {send, msgs, userId, self, other} = useChat()
const themeVars: ConfigProviderThemeVars = {
  navBarTitleFontSize: '18px',
  navBarBackground: '#F4F4F4',
}
const onClickLeft = () => history.back()
const chatContent = ref('');
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
//登录用户的userId
const loginUserId = userStore.userId
const expertId = ref()
const onSubmit = () => {
  const transData = {
    message: chatContent.value,
    userId: self.value.id,
    to: other.value.id
  }
  send(transData)

  let typeContent = {
    createTime: getNowDate(),
    isDeleted: 0,
    message: chatContent.value,
    userId: self.value.id,
    toUserId: other.value.id,
    type: 4
  }
  msgs.value.push(typeContent)
  let msgLength = msgs.value.length - 1
  nextTick(() => {
    document.getElementById(`msg${msgLength}`)!.scrollIntoView();
  })
  chatContent.value = ''
};

//判断是否是专家从而显示结束按钮
//预约记录信息
const appointHistory = ref()
const onExpertChat = () => {
  getAppointHistory({appointmentId: route.params.appointmentId}).then(res => {
    expertId.value = res[0].expertId
    appointHistory.value = res[0]
  })
}
//结束服务按钮
const endService = () => {
  showConfirmDialog({
    title: '结束服务',
    message:
        '确认要结束服务吗',
  })
      .then(() => {
        endAppoint({
          id: route.params.appointmentId,
          expertId: appointHistory.value.expertId,
          userId: appointHistory.value.userId,
          appointmentId: appointHistory.value.appointmentId
        }).then(res => {
          Toast.success('已结束服务')
          eventBus.emit('serviceEnd')
        })
        router.push('/expertHistory')
      })
      .catch(() => {
      });
}
onMounted(() => {
  onExpertChat()
})
</script>

<style lang="less" scoped>
.chat {
  height: 100%;
  background-color: #F4F4F4;
  overflow-y: auto;

  &-wrapper {
    padding: 50px 0 150px 0;

    .sendWrapper {
      bottom: 45px;
      position: fixed;
      width: 100%;
      height: 60px;
      background: #F4F4F4;
      box-shadow: inset 0 0.5px 0 0 rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      padding: 0 16px;

      form {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-msg {
        width: 245px;
        height: 36px;
        background: #FFFFFF;
        border-radius: 5px;
        font-size: 16px;
        padding: 0 0 0 10px;
      }

      &-btn {
        width: 80px;
        height: 35px;
        background: #5188ED;
        color: #fff;
        border: none;
        border-radius: 5px;
        margin-left: 20px;
      }
    }

    &-content {
      &-time {
        text-align: center;
        color: rgba(39, 40, 50, 0.30);
        margin: 10px 0;
      }

      &-item {
        display: flex;
        margin: 10px 0 0 16px;

        &-avatar {
          &-pic {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        &-message {
          margin-left: 10px;
          max-width: 245px;
          background: #fff;
          border-radius: 10px;
          padding: 10px;
        }
      }

      .right {
        flex-direction: row-reverse;
        margin-right: 16px;

        .rightTxt {
          color: #000;
          margin-right: 10px;
          max-width: 245px;
          background: #A9E979;
          border-radius: 10px;
          padding: 10px
        }
      }
    }
  }
}
</style>
