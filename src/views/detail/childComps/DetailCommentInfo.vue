// 评论区

<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right">
          <img src="~assets/img/common/back.svg" alt=""
        /></i>
      </div>
    </div>
    <!-- 用户 -->
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <!-- 内容 -->
    <div class="info-text">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      // 1\将时间戳转成Date对象
      const date = new Date(value * 1000);

      // 2、将date进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style scoped>
.comment-info {
  margin: 10px;
}
.info-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  padding-right: 20px;
  font-size: 16px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.arrow-right img {
  /* 绝度定位 */
  position: absolute;
  width: 6%;
  top: 10px;
  right: 0;
  transform: rotateZ(180deg);
}
.info-user {
  height: 55px;
  line-height: 55px;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.info-user img {
  width: 50px;
  border-radius: 25px;
  margin-right: 10px;
}
.info-text p {
  font-size: 14px;
  color: #999;
  margin-bottom: 6px;
}
.info-other {
  line-height: 20px;
  font-size: 13px;
  color: #bbb;
}
.info-other .date {
  margin-right: 15px;
}
.info-imgs {
  padding: 5px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  margin-bottom: 10px;
}

.info-imgs img {
  width: 28%;
  margin-right: 10px;
  border-radius: 8px;
}
</style>