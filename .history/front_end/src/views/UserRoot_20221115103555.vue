<template>
  <div id="user-root">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "UserRoot"
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