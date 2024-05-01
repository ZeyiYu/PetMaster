<template>
  <div class="message-comp">
    <div class="item">
      <div class="item-avatar flex_center_center">
        <div class="item-avatar-pic1 flex_center_center">
          <Icon name="aite" size="20" color="#fff"></Icon>
        </div>
      </div>
      <div class="item-info font_s14" @click="router.push('/atMe')">
        <div>Mentions</div>
        <div class="item-info-arrow">
          <Icon name="rightarrow" size="14"></Icon>
        </div>
      </div>
    </div>
    <div class="item" @click="router.push('/comments')">
      <div class="item-avatar flex_center_center">
        <div class="item-avatar-pic2 flex_center_center">
          <Icon name="pinglun1" size="20" color="#fff"></Icon>
        </div>
      </div>
      <div class="item-info font_s14">
        <div>Comments</div>
        <div class="item-info-arrow">
          <Icon name="rightarrow" size="14"></Icon>
        </div>
      </div>
    </div>
    <div class="item" @click="router.push('/whoLiked')">
      <div class="item-avatar flex_center_center">
        <div class="item-avatar-pic3 flex_center_center">
          <Icon name="dianzan1" size="20" color="#fff"></Icon>
        </div>
      </div>
      <div class="item-info font_s14">
        <div>Likes</div>
        <div class="item-info-arrow">
          <Icon name="rightarrow" size="14"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style lang="less" scoped>
.message-comp {
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    &-avatar {
      &-pic1 {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #59add2;
      }
      &-pic2 {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #35b07c;
      }
      &-pic3 {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #f39c0a;
      }
    }

    &-info {
      margin-left: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 0.5px solid #eee;

      &-arrow {
        color: #8e8e8e;
      }
    }
  }

}
</style>
