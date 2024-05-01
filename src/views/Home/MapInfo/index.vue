<template>
  <div class="home-mapInfo">
    <van-config-provider :theme-vars="themeVars">
      <div class="profile">
        <div class="profile-title" @click="router.push('/locationPage')">
          <div class="font_s14">
            <div class="flex_center_center">
              <div style="margin-right: 8px">
                <Icon name="dingwei" color="#f4662f" size="18"></Icon>
              </div>
              <div style="color: #e4a140">
                Real-time Location
              </div>
            </div>
          </div>
          <div class="flex_center_center">
            <Icon name="rightarrow" size="14"></Icon>
          </div>
        </div>
        <div class="profile-content">
          <div class="font_w300" v-if="distance && petLocationName">
            <div>
              <div class="font_s14 profile-content-title">
                Bailey is now on
              </div>
              <div class="font_s16 font_w400 profile-content-specific">
                {{ petLocationName }}
              </div>
            </div>
            <div style="margin:18px 0 18px 0">
              <div class="font_s14 profile-content-title">
                Directions
              </div>
              <div class="font_s16 font_w400 profile-content-specific">
                {{ distance }} Miles
              </div>
            </div>
            <div>
              <div class="font_s14 profile-content-title">
                Jack has been out for
              </div>
              <div class="font_s16 font_w400 profile-content-specific">
                30 min
              </div>
            </div>
          </div>

          <div class="flex_center_center" style="width: 350px" v-else>
            <van-loading></van-loading>
          </div>
          <div class="profile-content-map" v-show="distance && petLocationName">
            <div class="profile-content-map-pic" id="container"></div>
          </div>
        </div>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById} from "@/assets/api/Social/User";
import {ConfigProviderThemeVars, showConfirmDialog, showImagePreview, Toast} from "vant";
import {getDistance, transContent} from "@/utils/tools";
import {follow, getFollowerOrFollowing, unFollow} from "@/assets/api/Social/Follow";
import {useUserStore} from "@/store/userInfo";
import {deletePost} from "@/assets/api/Social/UserPost";

const router = useRouter()
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: '2px'
};


import {Loader} from "@googlemaps/js-api-loader";
import {getLatestLocation} from "@/assets/api/Location"; //引入
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
    zoom: 15,
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
        console.log(currentLocation, 'ahahahahahaha')

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: currentLocation}, function (results: any, status: any) {
          if (status == 'OK') {
            console.log(results[1].formatted_address)
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
            console.log(distance.value, pos.lat, petLocation.value.lat, '距离')
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

const onLocation = async () => {
  getLatestLocation().then((res) => {
    petLocation.value = res[0]
  })
}

onMounted(() => {
  initMap()
  onLocation()
})
</script>

<style lang="less" scoped>
.home-mapInfo {
  //border-top: 1px solid #eee;
  background-color: #f4f4f5;
  padding: 8px 15px;

  .profile {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 15px 20px 15px;
    box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.1);

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #595959;
    }

    &-content {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      &-map {
        border-radius: 10px;
        width: 160px;
        height: 160px;
        //background-color: #000;

        &-pic {
          width: 160px;
          height: 160px;
          border-radius: 10px;
          object-fit: cover;
        }
      }

      &-title {
        color: #a1a1a1;
      }

      &-specific {

      }
    }
  }
}
</style>
