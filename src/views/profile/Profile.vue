<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->
<template>
  <div class="profile">
    <navbar><div slot="center">用户界面</div></navbar>

    <scroll class="content">
      <div class="main">
        <img src="~assets/img/profile/mine.png" alt="" />
      </div>
    
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import Navbar from "components/common/navbar/navbar.vue";
export default {
  components: { Scroll, Navbar },
  name: "Profile",
};
</script>

<style scoped>
.profile {
  height: 100vh;
}
.content {
  /* height: 300px; */
  height: calc(100% - 44px - 49px);
  background-color: red;
  overflow: hidden;
}
.main img {
  width: 100%;
}
</style>