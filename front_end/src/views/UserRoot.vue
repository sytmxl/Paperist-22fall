<template>
  <div id="user-root">
    <TopBar/>
    <router-view/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";

export default {
  name: "UserRoot",
  components: {
    TopBar,
  }
}
</script>

<style>
*::-webkit-scrollbar{
    width: 10px;
}
*::-webkit-scrollbar-thumb{
    background: #ccc; 
    border-radius: 5px;
}

*{
    scrollbar-width: 10px;
    scrollbar-base-color: green;
    scrollbar-track-color: red;
    scrollbar-arrow-color: blue;
}
</style>