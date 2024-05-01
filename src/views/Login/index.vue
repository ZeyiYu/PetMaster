<template>
  <div class="login">
    <img src="../../assets/image/loginLogo.png" @click="reload" alt=""/>
    <div class="login-title font_s24">PetMaster</div>
    <!--
        <img src="http://127.0.0.1:10001/sms/system/getVerifiCodeImage" @click="reload" alt=""/>
    -->

    <van-cell-group inset>
      <van-field
          v-model="username"
          name="用户名"
          placeholder="Username"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          name="验证码"
          placeholder="Password"
          :rules="[{ required: true, message: '请填写验证码' }]"
      >

        <!--          <template #button>
                    <span style="color: #d2970b" @click="sendCode">Send code</span>
                  </template>-->
      </van-field>
    </van-cell-group>
    <div class="flex_center_center" @click="login">
      <div class="login-button flex_center_center">
        <Icon name="arrow-right" size="20" color="#fff"></Icon>
      </div>
    </div>
    <!--      <div class="flex_center_center">
            <van-button class="login-button" round block plain type="primary" native-type="submit">
              Log In
            </van-button>
          </div>-->
  </div>
</template>

<script setup lang="ts">
import {userLogin} from "@/assets/api/Login";
import {getToken, setToken} from "@/utils/setToken";
import Toast from "@/components/Toast";
import router from "@/router";

const username = ref('');
const password = ref('');
/*const sendCode = () =>{
  sendSmsCode(phoneNumber.value).then(res => {
    Toast.success('验证码已发送')
  })
}*/

const login = () => {
  userLogin({
    username: username.value,
    password: password.value
  }).then(res => {
    if (res) {
      console.log(res,'登陆信息')
      let token: string = res.token
      setToken('token', token)
      router.push('/')
    }
  }).catch(err => {
    console.log(err)
  })
}
const reload = () => {
  location.reload()
}
onMounted(() => {
})
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #fff;

  img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 40%;
    width: 50%;
  }

  &-title {
    font-family: "Gill Sans";
    color: #e3a50b;
    position: relative;
    text-align: center;
    margin-top: -20px;
    margin-bottom: 20px;
  }

  &-button {
    margin-top: 30px;
    background-image: linear-gradient(to left, #e3a506, #eacc6a);
    border: none;
    border-radius: 50%;
    padding: 20px;
    width: 50px;
    height: 50px;
  }

  /*  &-button {
      margin-top: 30px;
      width: 330px;
    }*/
}
</style>
