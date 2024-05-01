<!--suppress ALL -->
<template>
  <div class="me-settings">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Settings"
          fixed
          left-arrow
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="me-settings-content">
        <van-cell-group inset>
          <van-cell title="Avatar" value="" is-link @click="editAvatar = true"/>
          <van-cell title="Nickname" value="Zachary Miller" @click="editNickname = true"/>
          <van-cell title="Gender" :value="gender === 1 ?'Female':'Male'" @click="editGender = true"/>
          <van-cell title="Birthday" value="1989-09-06" @click="editBirth = true"/>
          <van-cell title="Contact" :value="contactNumber" @click="editContact = true"/>
          <van-cell title="Log out" is-link @click="logOut"/>
        </van-cell-group>
      </div>

      <van-action-sheet v-model:show="editAvatar" title="更换头像">
        <div class="changeAvatar">
          <div class="upload flex_center_center">
            <van-uploader
                v-model="fileList"
                multiple
                :after-read="afterRead"
                :max-count="6">
              <van-button icon="plus" class="upload-button"></van-button>
            </van-uploader>
          </div>
          <div class="title flex_center_center font_s18">
            上传你的个性头像
          </div>
        </div>
      </van-action-sheet>

      <van-action-sheet v-model:show="editNickname" title="昵称">
        <van-form @submit="nicknameSubmit">
          <van-field
              v-model="nickname"
              name="昵称"
              label="昵称"
              placeholder="请输入昵称"
              :rules="[{ required: true, message: '请输入昵称' }]"
          />
          <div style="margin: 16px;">
            <van-button block type="default" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-action-sheet>

      <van-picker
          @cancel="cancelGender"
          @confirm="confirmGender"
          v-show="editGender"
          title="性别"
          :columns="columns"
          style="z-index: 3;position:absolute;bottom: 56px;width: 100%"
      />

      <van-date-picker
          @cancel="cancelBirth"
          @confirm="confirmBirth"
          v-show="editBirth"
          v-model="currentDate"
          title="生日"
          :min-date="minDate"
          :max-date="maxDate"
          style="z-index: 3;position:absolute;bottom: 56px;width: 100%"
      />

      <van-action-sheet v-model:show="editContact" title="联系方式">
        <van-form @submit="contactSubmit">
          <van-field
              v-model="contactNumber"
              name="联系方式"
              label="联系方式"
              placeholder="请输入联系方式"
              :rules="[{ required: true, message: '请输入联系方式' }]"
          />
          <div style="margin: 16px;">
            <van-button block type="default" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-action-sheet>

      <Footer :footerActive="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {useSetting} from "@/views/Me/Settings/useSetting";
import Toast from "@/components/Toast";
import {removeToken} from "@/utils/setToken";

const themeVars: ConfigProviderThemeVars = {
  navBarBackground: '#f4f4f5',
};
const router = useRouter()
const onClickLeft = () => history.back();
/*const {
  editAvatar,
  editNickname,
  editGender,
  editBirth,
  editContact,
  nickname,
  gender,
  birthday,
  contactNumber,
  fileList,
  columns,
  minDate,
  maxDate,
  currentDate,
  afterRead,
  nicknameSubmit,
  cancelGender,
  confirmGender,
  cancelBirth,
  confirmBirth,
  contactSubmit
} = useSetting()*/

const logOut = () => {
  Toast.success('Logout')
  removeToken('token')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.me-settings {
  height: 100%;
  background-color: #FAFAFA;
  position: relative;

  &-content {
    position: relative;
    padding-top: 60px;
  }

  .changeAvatar {
    .title {
      margin: 20px 0 20px 0;
    }

    .upload {
      margin: 10px 0 0 0;

      &-button {
        padding: 40px 33px 40px 33px;
      }

    }
  }

}
</style>
