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
  },
  provide() {
        return {
          reload: this.reload
        }
  },
  mounted() {
    // window.addEventListener("scroll", this.scroll0,true);
    var topbar = document.getElementById("topbar");
    var content = document.getElementById("bar-content");
    // content.style.width='100%';
    // body.style.backgroundColor='#003b55';

  },
	destroyed() {
		// window.removeEventListener("scroll", this.scroll0,true);
	},
  methods: {
    scroll0() {
			let that = this;
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			that.scrollTop = scrollTop;
      console.log(that.scrollTop);
      var topbar = document.getElementById("topbar");
      var content = document.getElementById("bar-content");
			if (that.scrollTop > 10) {
        content.style.width='max-content';

			} else {
        content.style.width='100%';
			}
		},
  },
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