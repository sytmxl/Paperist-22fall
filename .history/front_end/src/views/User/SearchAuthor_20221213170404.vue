<template>
  <div class="main">
    <div style="height: 10vh"></div>
    <div class="content">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="back()">返回主页</el-button>
        </el-col>
      </el-row>
      <el-row class="cards">
        <el-col
          :span="6"
          v-for="(item, index) in searchAuthors"
          :key="item.id"
          :offset="index % 3 > 0 ? 2 : 0"
        >
          <el-card style="margin-bottom: 3vh">
            <div class="title" @click="toPersonalInfo(item._source.id)">
              {{ item._source.name }}
            </div>
            <el-divider></el-divider>
            <div class="text" style="margin-top: 1vh">国家/地区: 克罗地亚</div>
            <div class="text">研究领域: 深度学习</div>
            <div class="text">论文数量: {{item._source.n_pubs}}</div>
            <div class="text">被引用次数: {{item._source.n_citation}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchAuthor",
  data() {
    return {
      search_query: null,
      searchAuthors: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/firstPage");
    },
    toPersonalInfo(id) {
      let routeData = this.$router.resolve({
        name: "PersonalInformation",
        params: { id: id },
      });
      window.open(routeData.href, "_blank");
    },
  },
  created() {
    this.search_query = this.$route.query.search_query;
    let obj = {
      query: {
        bool: {
          must: [],
          filter: {},
        },
      },
    };
    obj.query.bool.must.push({
      match_phrase: { name: this.search_query },
    });
    obj.query.bool.filter = {
      match_phrase: { name: this.search_query },
    };
    this.$axios({
      headers: {
        "content-type": "application/json",
      },
      auth: {
        username: "elastic",
        password: "BZYvLA-d*pS0EpI7utmJ",
      },
      url: "/es/author/_search",
      method: "post",
      data: JSON.stringify(obj),
    }).then((res) => {
      console.log(res.data.hits.hits);
      // for (let i = 0; i < res.data.hits.hits.length; i++) {
      //   this.searchAuthors[i] = res.data.hits.hits[i]._source;
      // }
      this.searchAuthors = res.data.hits.hits;
      console.log(this.searchAuthors);
    });
  },
};
</script>

<style scoped>
.main {
  height: auto;
}
.title {
  font-weight: 600;
  font-size: large;
  text-align: left;
  margin-bottom: 1vh;
  cursor: pointer;
}
.text {
  text-align: left;
  font-size: small;
}
.content {
  margin-left: 15vw;
  margin-right: 15vw;
}

.cards {
  margin-top: 3vh;
  margin-left: 5vw;
  margin-right: 5vw;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  width: auto;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
