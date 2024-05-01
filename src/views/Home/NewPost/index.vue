<template>
  <div class="home-newPost">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar
          left-arrow
          @click-left="onClickLeft"
      >
        <template #right>
          <a class="font_w500" style="color:#1c85f1;" @click="send">发布</a>
        </template>
      </van-nav-bar>
      <div class="content">
        <div class="text">
          <van-field
              v-model="postContent"
              rows="4"
              autosize
              type="textarea"
              maxlength="150"
              placeholder="分享新鲜事..."
              class="text-area"
              id="input"
          />
        </div>
        <div class="uploadImage">
          <van-grid :border="false" square center>
            <van-grid-item v-for="(item,index) in fileUrl" :key="index">
              <van-image
                  @click="showImage(index)"
                  width="90"
                  height="85"
                  fit="cover"
                  :src="item"
                  radius="8px"
              />
            </van-grid-item>
          </van-grid>
        </div>
        <div class="butt">
          <div>
            <van-uploader
                multiple
                :after-read="afterRead"
                :max-count="6">
              <Icon name="tupian" size="20"></Icon>
            </van-uploader>
          </div>
          <div @click="atUser">
            <Icon name="aite" size="20"></Icon>
          </div>
          <div @click="addTag">
            <Icon name="jinghaojian" size="20"></Icon>
          </div>
        </div>
      </div>

      <van-action-sheet v-model:show="showTags" title="搜索圈子">
        <div class="searchTags">
          <van-search v-model="searchTags" placeholder="请输入要搜索的圈子" @update:model-value="search"/>
          <div class="searchTags-wrapper">
            <template v-for="item in searchResult" v-if="searchResult">
              <div class="item">
                <div class="item-avatar">
                  <img :src="item.categoryImage" class="item-avatar-img" alt="">
                </div>
                <div class="item-name font_s16" @click="addTagsToPost(item)">{{ item.categoryName }}</div>
              </div>
            </template>
            <div class="flex_center_center" v-else>
              <van-loading></van-loading>
            </div>
          </div>
        </div>
      </van-action-sheet>
      <Footer :active="3"></Footer>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import type {ConfigProviderThemeVars} from 'vant';
import {sendPost} from "@/assets/api/Social/UserPost";
import {useUserStore} from "@/store/userInfo";
import {showImagePreview} from "vant";
import Toast from "@/components/Toast";
import router from "@/router";
import {getSquareCategory} from "@/assets/api/Social/SquareCategory";

const themeVars: ConfigProviderThemeVars = {
  navBarIconColor: '#999999',
  buttonDefaultColor: '#999',
  buttonDefaultBorderColor: '#eee',
  buttonIconSize: '15px',
  buttonPrimaryBackground: '#1c85f1',
  buttonPrimaryBorderColor: '#1c85f1',
  gridItemContentPadding: '1px'
};
const onClickLeft = () => history.back();

const fileUrl = ref<any[]>([])
const afterRead = (file: any) => {
};

//输入的发帖内容
const postContent = ref('')
//按下后文本添加 # 和 @
const showTags = ref(false)
const addTag = () => {
  showTags.value = true
  postContent.value = postContent.value + '#'
}
const atUser = () => {
  postContent.value = postContent.value + '@'
}

//按下#后搜索圈子
const searchTags = ref()
const searchResult = ref()
//记录选择的圈子的ID
const categoryIndex = ref(0)
const search = async () => {
  searchResult.value = await getSquareCategory(searchTags.value)
}
onMounted(() => {
  search()
})
const addTagsToPost = (content: any) => {
  postContent.value = postContent.value + content.categoryName + '# '
  categoryIndex.value = content.id
  showTags.value = false
}

//点击全屏预览图片
const showImage = (index: any) => {
  showImagePreview({
    images: fileUrl.value,
    startPosition: index
  })
}

//点击发帖
const userStore = useUserStore()
const send = () => {
  sendPost({
    userId: userStore.userId,
    content: postContent.value,
    pictureUrl: fileUrl.value.toString(),
    categoryId: categoryIndex.value !== 0 ? categoryIndex.value : '',
    type: 0
  }).then(res => {
    Toast.success('发帖成功')
    router.push('/home')
  })
}
</script>

<style lang="less" scoped>
.home-newPost {
  border-radius: 0 0 10px 10px;
  background-color: #fff;
  height: calc(100vh - 65px);
  overflow-y: auto;

  /deep/ .van-field__control::-webkit-input-placeholder {
    font-size: 18px;
    font-weight: 300;
  }

  .content {
    .uploadImage {
      width: 100%;
      padding: 0 10px;
    }

    .comment {
      margin: 0 0 15px 15px;
      color: #333333;
      display: flex;

      &-tag {
        padding: 5px 13px 5px 13px;
        text-align: center;
        background-color: #F6F6F5;
        border-radius: 5px;
      }

      &-user {
        margin-left: 10px;
        text-align: center;
        padding: 5px 13px 5px 13px;
        background-color: #F6F6F5;
        border-radius: 5px;
      }
    }

    .butt {
      position: fixed;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      width: 50%;
      justify-content: space-between;
    }
  }

  .searchTags {
    &-wrapper {
      padding: 5px 15px;
    }

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-bottom: 0.5px solid #eee;

      &-avatar {
        margin-right: 10px;

        &-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }
}

</style>
