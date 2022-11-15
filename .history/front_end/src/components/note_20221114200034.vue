<template>
    <el-main>
        <div v-for="i in list" :key="i">
             <div class="image">
            <img :src="i.image" alt="">
            </div>
             <div class="content">
                <div class="name">
                    <span>{{i.name}}</span>
                </div>
                <div class="comment">
                    {{i.intro}}
                </div>
                <div class="response">
                    <i class="el-icon-chat-round" @click="CreatCommentVisible =true"></i>
                    <i class="el-icon-thumb">{{likes}}</i>
                    <i class="el-icon-warning-outline"></i>
                </div>
             </div>
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

<style scoped>

</style>