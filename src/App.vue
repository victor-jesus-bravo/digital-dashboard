<template>
  <div class="wrapper">
    <Navbar />
    <div class="content-wrapper">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>