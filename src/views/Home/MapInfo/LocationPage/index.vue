<template>
  <div class="home-location">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-text="Back"
          title="Pet's location"
          left-arrow
          fixed
          @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="content">
        <div class="content-map">
          <div id="container">
          </div>
        </div>
        <div class="content-location">
          <div class="content-location-title font_w500" style="font-size: 18px">Latest location</div>
          <div class="line"></div>
          <div class="content-location-item" v-if="distance && petLocationName">
            <div style="display: flex;align-items: center">
              <div class="content-location-item-avatar flex_center_center">
                <img class="content-location-item-avatar-pic" src="/src/assets/image/petProfile.jpeg"/>
              </div>
              <div>
                <div style="color: #020203" class="font_w400 font_s16">
                  Jack
                </div>
                <div style="color: #838287" class="font_w300 font_s14">
                  {{ cutString(petLocationName, 23) }} • now
                </div>
              </div>
            </div>
            <div style="color: #838287" class="font_w300 font_s14">
              {{ distance }} miles
            </div>
          </div>
          <div class="flex_center_center" v-else>
            <van-loading/>
          </div>
          <div class="content-location-title font_w500" style="font-size: 18px;margin-top: 40px">Visited location</div>
          <div class="line"></div>
          <div class="content-location-item">
            <div style="display: flex;align-items: center">
              <div>
                <div style="color: #020203" class="font_w400 font_s16">
                  ArcelorMittal Orbit, London
                </div>
                <div style="color: #838287" class="font_w300 font_s14">
                  E20 2AD
                </div>
              </div>
            </div>
            <div style="color: #838287" class="font_w300 font_s14">
              5 mins ago
            </div>
          </div>
          <div class="content-location-item">
            <div style="display: flex;align-items: center">
              <div>
                <div style="color: #020203" class="font_w400 font_s16">
                  Warton Road Railway Bridge, London
                </div>
                <div style="color: #838287" class="font_w300 font_s14">
                  E15 2JS
                </div>
              </div>
            </div>
            <div style="color: #838287" class="font_w300 font_s14">
              8 mins ago
            </div>
          </div>
          <div class="content-location-item">
            <div style="display: flex;align-items: center">
              <div>
                <div style="color: #020203" class="font_w400 font_s16">
                  West Ham United Stadium, London
                </div>
                <div style="color: #838287" class="font_w300 font_s14">
                  E20 2ST
                </div>
              </div>
            </div>
            <div style="color: #838287" class="font_w300 font_s14">
              10 mins ago
            </div>
          </div>
          <div class="content-location-item">
            <div style="display: flex;align-items: center">
              <div>
                <div style="color: #020203" class="font_w400 font_s16">
                  The View Tube, London
                </div>
                <div style="color: #838287" class="font_w300 font_s14">
                  E15 2PJ
                </div>
              </div>
            </div>
            <div style="color: #838287" class="font_w300 font_s14">
              13 mins ago
            </div>
          </div>

          <!--          <template v-for="item in contactFile" v-if="contactFile">
                      <div class="content-contact-item">
                        <div class="left">
                          <div class="item-info">
                            <div class="item-info-top font_w400 font_s18">
                              {{ item.name }}
                            </div>
                            <div class="font_s16 font_w300" style="color: #8e8e8e">
                              {{ item.contract }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>-->
        </div>
      </div>
      <Footer :active="1"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';

import {useUserStore} from "@/store/userInfo";
import Toast from "@/components/Toast";
import {cutString} from "@/utils/tools";

const themeVars: ConfigProviderThemeVars = {
  //navBarIconColor: '#333333',
  //navBarTextColor: '#333333',
  navBarTitleFontSize: '18px',
  //navBarBackground: '#F7F7F7'
};

import {Loader} from "@googlemaps/js-api-loader";
import {getAfterLocation, getBetweenLocation, getLatestLocation} from "@/assets/api/Location";
import {getDistance} from "@/utils/tools"; //引入
const loader = new Loader({
  apiKey: "AIzaSyA8yJphGGW6NAoNqdXSGMop30liLTaJlrc",//之前的key
  version: "weekly",//版本
  libraries: ["places"],
});


const distance = ref()
const petLocationName = ref()

function initMap() {
  let center = {lat: 51.53815, lng: -0.010095}
  const mapOptions = {
    center: center,
    zoom: 16,
    disableDefaultUI: true,
  };

  loader
      .load()
      .then(async (google) => {
        const map = new google.maps.Map(
            document.getElementById("container"),
            mapOptions
        );
        const marker = new google.maps.Marker({
          position: center, // 标记的位置
          map: map, // 标记所在的地图
        });

        const result = await getLatestLocation()

        let currentLocation = {
          lat: parseFloat(result[0].lat),
          lng: parseFloat(result[0].lng)
        }

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: currentLocation}, function (results: any, status: any) {
          if (status == 'OK') {
            petLocationName.value = results[1].formatted_address
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            distance.value = getDistance(pos, petLocation.value).toFixed(2)
            console.log(distance.value, pos.lat, petLocation.value, '距离')
          }, function () {
          });
        } else {
          // Browser doesn't support Geolocation
        }
      })
      .catch((e) => {
        // do something
        console.log(e);
      });
}

const petLocation = ref()

const onLocation = () => {
  getLatestLocation().then((res) => {
    petLocation.value = res[0]
  })

  getAfterLocation({
    start: "2024-03-10T09:10:00",
  }).then((res) => {

    console.log(res, 'caonima')
  })
}

onMounted(() => {
  initMap()
  onLocation()
})
const onClickLeft = () => history.back();
/*const userStore = useUserStore()
const onClickLeft = () => history.back();
const {location} = useEmergency()

//紧急联系人档案
const contactFile = ref()
const onEmergency = async () => {
  const contact = await getHealthFiles({userId: userStore.userId})
  contactFile.value = contact.filter((item: any) => {
    return item.relation !== '本人'
  })
}

//点击一键求助
const sos = () => {
  sendEmergency({
    location: location.value,
    event: ''
  }).then(res => {
    Toast.success('发送紧急求助成功！')
  })
}

onMounted(() => {
  onEmergency()
})*/
</script>

<style lang="less" scoped>
.home-location {
  border-radius: 0 0 10px 10px;
  background-color: #F7F7F7;
  height: 100%;
  overflow-y: auto;
  position: relative;

  .content {
    position: relative;
    padding: 45px 0 20px 0;

    &-map {
      display: flex;
      justify-content: center;

      #container {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 400px;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
      }
    }

    .line {
      margin: 15px 0 5px 0;
      border-bottom: 1px solid #eee;
      width: 100%;
    }

    &-desc {
      text-align: center;
      margin: 25px 0 20px 0;
    }

    &-sos {
      margin-top: 30px;
      position: relative;
      display: flex;
      justify-content: center;

      .sos {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #EB4D3E;
        border-radius: 50%;
        color: #fff;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.1);
        -webkit-animation-name: scaleDraw;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-duration: 2s;
      }

      @keyframes scaleDraw {
        0% {
          transform: scale(1);
        }
        25% {
          transform: scale(1.25);
        }
        50% {
          transform: scale(1);
        }
        75% {
          transform: scale(1.1);
        }
      }
    }

    &-location {
      padding: 20px 10px 20px 10px;

      &-title {

      }

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 15px 0;

        &-info {
          margin-left: 10px;
        }

        &-avatar {
          margin-right: 10px;

          &-pic {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            object-fit: cover;
          }
        }

      }
    }
  }
}
</style>
