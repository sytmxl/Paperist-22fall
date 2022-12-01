<template>
  <div>
    <div>
      <paper-card/>
      <el-button @click="post_common_search">DEBUG</el-button>
      <paper-card v-for="paper in papers"
                  :title="paper._source.title"
                  :authors="paper._source.authors"
                  :cite="paper._source.n_citation"
                  :content="paper._source.abstract"
                  :source="paper._source.venue.raw"
                  :year="paper._source.year"
                  :keywords="paper._source.keywords"
                  :issue="paper._source.issue"
      />

      <p>{{es_request_body_json}}</p>
      <el-divider></el-divider>
      <p>{{es_respond}}</p>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from "crypto-js";
import PaperCard from "@/components/PaperCard";

export default {
  name: "debug",
  components: {PaperCard},
  data(){
    return{
      common_search_query :"of",
      es_request_body_json : "",
      es_respond : "",
      papers : []
    }
  },
  methods:{
    post_common_search(){
      let es_request_body_common = {
        "query":{
          "query_string":{
            "query": this.common_search_query
          }
        }
      }
      let es_request_body_advanced = {

      }
      this.es_request_body_json = JSON.stringify(es_request_body_common)
      axios({
        headers: {
          'content-type': 'application/json',

        },
        auth: {
          username: 'elastic',
          password: 'BZYvLA-d*pS0EpI7utmJ'
        },
        url: 'es/paper_test/_search', method: "post",
        data: JSON.stringify(es_request_body_common)
        }
      ).then(res=>{
        this.es_respond = res.data.hits.hits
        this.papers = this.es_respond
      })
    },
    post_advanced_search(){

    }
  }
}
</script>

<style scoped>

</style>