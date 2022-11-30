<template>
  <div>
    <div style="margin-top: calc(10vh)">
      <p>{{es_request_body_json}}</p>
      <p>{{es_respond}}</p>
      <el-button @click="post_common_search">DEBUG</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
  name: "debug",
  data(){
    return{
      common_search_query :"of",
      es_request_body_json : "",
      es_respond : ""
    }
  },
  methods:{
    post_common_search(){
      let es_request_body = {
        "query":{
          "query_string":{
            "query": this.common_search_query
          }
        }
      }
      this.es_request_body_json = JSON.stringify(es_request_body)
      axios({
        headers: {
          'content-type': 'application/json',

        },
        auth: {
          username: 'elastic',
          password: 'BZYvLA-d*pS0EpI7utmJ'
        },
        url: 'es/paper_test/_search', method: "post",
        data: JSON.stringify(es_request_body)
        }
      ).then(res=>{
        this.es_respond = res.data
      })
    },
    post_advanced_search(){

    }
  }
}
</script>

<style scoped>

</style>