<template>
  <div class="square-allSquare">
    <van-config-provider :theme-vars="themeVars">
      <div style="height:20px;" class="search flex_center_center">
        <van-search
            v-model="searchSquare"
            placeholder="搜索圈子"
            input-align="center"
            class="search-input"
            @update:model-value="onSearch"
        />
      </div>
      <div v-if="squareList">
        <van-sidebar v-model="active" class="square-allSquare-sidebar" @change="onChange">
          <van-sidebar-item
              :title="item.categoryName"
              v-for="(item,index) in category"/>
        </van-sidebar>
        <div class="square-allSquare-eachSquare">
          <div v-for="item in squareList">
            <Item :eachSquare="item"></Item>
          </div>
        </div>
      </div>
      <div v-else class="loading flex_center_center">
        <van-loading type="spinner"></van-loading>
      </div>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import {getParentSquare, getSquareCategory, getSquareDetail} from "@/assets/api/Social/SquareCategory";
import type {ConfigProviderThemeVars} from 'vant';

const active = ref(0);
const themeVars: ConfigProviderThemeVars = {
  sidebarBackground: '#fff',
  sidebarWidth: '75px',
  sidebarPadding: '12px 20px',
  sidebarTextColor: '#646464',
  searchBackground: '#eeeeee',
  searchContentBackground: '#eeeeee'
};
//圈子列表
const squareList = ref()
const searchSquare = ref()
const category = ref()
const onAllSquare = async () => {
  squareList.value = await getSquareDetail(1)
  category.value = await getParentSquare(0)
}

const onChange = async (index: any) => {
  squareList.value = await getSquareDetail(index + 1)
}

onMounted(() => {
  onAllSquare()
})

//搜索兴趣社区
const onSearch = async () => {
  if (searchSquare.value === '') {
    squareList.value = await getSquareDetail(active.value + 1)
  } else {
    squareList.value = await getSquareCategory(searchSquare.value)
  }
}
</script>

<style scoped lang="less">
.square-allSquare {
  position: relative;

  .search {
    margin-top: 25px;

    &-input {
      background-color: #eee;
      border-radius: 10px;
      height: 40px;
      width: 360px;
    }
  }

  &-sidebar {
    margin-top: 15px;
  }

  &-eachSquare {
    height: 100vh;
    overflow-y: auto;
    position: absolute;
    top: 40px;
    left: 65px;
    padding: 5px 5px 160px 20px;
    border-left: 1px solid #eee;
  }
  .loading{
    padding-top: 30px;
  }
}
</style>
