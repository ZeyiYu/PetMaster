<template>
  <div class="chat" v-if="msgs && self && other">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          :title="other.nickname"
          @click-left="onClickLeft"
          fixed
      >
        <template #left>
          <Icon name="xiangzuojiantou" size="16" color="#747474"></Icon>
        </template>
      </van-nav-bar>
      <div class="chat-wrapper">
        <div class="chat-wrapper-content">
          <div class="each" v-for="(item,index) in msgs" :id="'msg' + index">
            <div class="chat-wrapper-content-time font_s16">{{item.createTime}}</div>
            <div v-if="item.userId != userId && item.type === 4" class="chat-wrapper-content-item">
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
import {ConfigProviderThemeVars} from "vant";
import {useChat} from "../Chat/useChat";
import {getNowDate} from "@/utils/tools";

const {send, msgs, userId, self, other} = useChat()
const themeVars: ConfigProviderThemeVars = {
  navBarTitleFontSize: '18px',
  navBarBackground: '#F4F4F4',
}
const onClickLeft = () => history.back()

const chatContent = ref('');

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
      box-shadow: inset 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);
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
