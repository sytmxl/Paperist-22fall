<template>
    <el-main>
        <div v-for="i in list" :key="i">
            
        </div>
    </el-main>
</template>

<script>
export default {
  props: {
    list:{image:{default:"",type:String}}
  },
  data(){
    return{
        
    }
  },
  methods:{
   
  },
  mounted() {
    }
}
</script>

<style lang="scss" scoped>

</style>