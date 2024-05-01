<template>
  <div class="me-postItem">
    <van-config-provider :theme-vars="themeVars">
      <div class="profile" @click="router.push({name:'postPage',params:{articleId:props.postContent.id}})">
        <div class="profile-left">
          <img class="profile-left-avatar" :src="postContent.profilePhoto" alt=""/>
          <div class="profile-right">
            <div class="font_s14">
              {{ postContent.nickname }}
            </div>
            <div class="time font_s12 font_w300">
              {{ postContent.createTime }}
            </div>
          </div>
        </div>
        <!--        <div class="right">
                  <button class="right-btn2" v-if="postContent.userId == loginUser" @click.stop="deleteUserPost">
                     <span style="margin-right: 2px">
                    <Icon name="shanchu" size="18"></Icon>
                  </span>
                    删除
                  </button>
                </div>-->
      </div>
      <div v-html="postContent.content" class="content font_s14 font_w300"></div>
      <div class="picture">
        <van-grid :border="false" :column-num="columnNum" center>
          <template v-for="(item,index) in postContent.pictureUrl">
            <van-grid-item @click="showImage(index)">
              <van-image
                  fit="cover"
                  position="center"
                  :src="item"
                  width="100%"
                  :height="picHeight"
              />
            </van-grid-item>
          </template>
        </van-grid>
      </div>
      <PostFooter :footer="postContent"></PostFooter>
      <van-divider></van-divider>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ConfigProviderThemeVars, showConfirmDialog, showImagePreview} from "vant";
import {getUserInfoById} from "@/assets/api/Social/User";
import {useUserStore} from "@/store/userInfo";
import {deletePost} from "@/assets/api/Social/UserPost";

const router = useRouter()
/*const userStore = useUserStore()
const loginUser = userStore.userId*/
const themeVars: ConfigProviderThemeVars = {
  gridItemContentPadding: "2px",
};
const props = defineProps({
  postContent: {
    type: Object,
  }
})

//图片分栏展示
const columnNum = ref()
const picHeight = ref()
if (props.postContent!.pictureUrl !== null) {
  switch (props.postContent!.pictureUrl.length) {
    case 1:
      columnNum.value = 1
      picHeight.value = 215
      break
    case 2:
      columnNum.value = 2
      picHeight.value = 150
      break
    default:
      columnNum.value = 3
      picHeight.value = 100
  }
}
const userInfo = ref()
/*const onPostItem = async () => {
  userInfo.value = await getUserInfoById(props.postContent!.userId)
}*/
const showImage = (index: any) => {
  showImagePreview({
    images: props.postContent!.pictureUrl,
    startPosition: index
  })
}

// 点击删除帖子
const deleteUserPost = () => {
  showConfirmDialog({
    title: '删除帖子',
    message: '确定要删除帖子吗',
  })
      .then(() => {
        const res = deletePost(props.postContent!.id)
        location.reload()
      }).catch(() => {
  });

}
/*
onMounted(() => {
  onPostItem()
})*/
</script>

<style lang="less" scoped>
.me-postItem {
  margin-top: 15px;

  .profile {
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;

      &-avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    &-right {
      margin-left: 15px;

      .time {
        color: #8e8e8e;
      }
    }
  }

  .content {
    margin: 5px 0;
  }

  .right {
    &-btn2 {
      font-size: 13px;
      padding: 3px 10px 3px 6px;
      border-radius: 20px;
      background-color: transparent;
      border: 1px solid #8e8e8e;
      color: #8e8e8e;
      margin-left: 15px;
      display: flex;
      align-items: center;
    }
  }

}
</style>
