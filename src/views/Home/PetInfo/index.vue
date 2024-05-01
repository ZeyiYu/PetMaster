<template>
  <div class="home-petInfo">
    <van-config-provider :theme-vars="themeVars">
      <div class="profile" v-if="petProfile">
        <div class="profile-info">
          <div class="profile-info-avatarWrapper">
            <img class="profile-info-avatarWrapper-pic" :src="petProfile.avatarURL"/>
          </div>
          <div class="profile-info-right">
            <div class="font_s24 font_w500" style="color: #2d4d6c;">
              {{ petProfile.petName }}
              <span class="font_s14 font_w300" style="position:relative;color: #a1a1a1;margin-left: 8px;bottom: 2px">
                4 yr
              </span>
            </div>
            <div class="font_s16 font_w300" style="color: #595959;margin-bottom: 10px">
              {{latestWeight}} kg
              <span>
                <svg class="icon-pic" aria-hidden="true"
                     style="width: 18px;height: 18px;position: relative;top: 3px;margin-left: 3px">
                  <use xlink:href="#icon-xingbie-nan"></use>
                </svg>
              </span>
            </div>
            <div class="line">
            </div>
            <div class="font_s14 font_w300" style="color: #a1a1a1;">
              Haven't had dinner yet!
            </div>
          </div>
        </div>
        <div class="choice">
          <div class="choice-wrapper">
            <div class="choice-wrapper-item" @click="router.push('/vaccinationReminder')">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-yimiaofuwu"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Vaccination Reminder
              </div>
            </div>
            <div class="choice-wrapper-item">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-yuyuekanbing"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Care Schedule
              </div>
            </div>
            <div class="choice-wrapper-item" @click="router.push('/medicalRecords')">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-jiankangfuli"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Medical Records
              </div>
            </div>
            <div class="choice-wrapper-item" @click="router.push('/weightMonitoring')">
              <div class="icon font_s18 flex_center_center">
                <svg class="icon-pic" aria-hidden="true">
                  <use xlink:href="#icon-tijian"></use>
                </svg>
              </div>
              <div class="title font_s11 font_w300">
                Weight Monitoring
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
import {ConfigProviderThemeVars, showConfirmDialog, showImagePreview, Toast} from "vant";
import {formattedTime, transContent} from "@/utils/tools";
import {follow, getFollowerOrFollowing, unFollow} from "@/assets/api/Social/Follow";
import {useUserStore} from "@/store/userInfo";
import {deletePost} from "@/assets/api/Social/UserPost";
import {getLatestWeight, getPetInfo} from "@/assets/api/PetInfo";

const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};

const petProfile = ref()
const latestWeight = ref('')
const onPet = () => {
  getPetInfo().then((res) => {
    petProfile.value = res
  })

  getLatestWeight().then((res) => {
    latestWeight.value = (res.weight / 1000).toFixed(2).toString()
  })
}

onMounted(() => {
  onPet()
})

</script>

<style lang="less" scoped>
.home-petInfo {
  //border-top: 1px solid #eee;
  background-color: #f4f4f5;
  padding: 8px 15px;

  .profile {
    margin-top: 6px;
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 10px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);

    &-info {
      padding: 24px 16px 18px 16px;
      display: flex;

      &-avatarWrapper {
        background-color: #fff;
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.3);

        &-pic {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      &-right {
        height: 130px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0;

        .line {
          height: 1px;
          width: 160px;
          background-color: #eee;
          margin-bottom: 10px;
        }
      }

    }

    .choice {
      display: flex;
      justify-content: center;
      color: #595959;

      &-wrapper {
        width: 320px;
        height: 70px;

        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        &-item {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            &-pic {
              height: 30px;
              width: 30px;
            }

          }

          .title {
            height: 32px;
            margin-top: 5px;
          }
        }
      }

    }
  }
}
</style>
