<template>
  <el-container style="height: 100%" ref="homeRef">
    <public-nav></public-nav>
    <el-container>
      <!--main-->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-container>
  </el-container>
</template>
<script>
import Nav from '../components/Nav';

export default {
  components: {
    'public-nav': Nav,
  },
};
</script>
