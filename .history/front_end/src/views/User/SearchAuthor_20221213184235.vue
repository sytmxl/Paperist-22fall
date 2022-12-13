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
          :offset="index % 3 > 0 ? 1 : 0"
        >
          <el-card style="margin-bottom: 3vh; width: 80%">
            <div class="avatar" @click="toPersonalInfo(item._source.id)">
              <el-avatar :size="medium" :src="circleUrl"></el-avatar>
            </div>
            <div class="title" @click="toPersonalInfo(item._source.id)">
              {{ item._source.name }}
            </div>
            <el-divider></el-divider>
            <div class="text" style="margin-top: 1vh">
              <span class="subtitle">国家/地区:</span>
              <span class="subcontent">{{
                item._source.n_posts == null ? "未知" : item._source.n_posts
              }}</span>
            </div>
            <div class="text">
              <span class="subtitle">研究领域:</span>
              <span style="overflow: hidden">{{
                item._source.tags[0] == null ? "未知" : item._source.tags[0].t
              }}</span>
            </div>
            <div class="text">
              论文数量:
              {{ item._source.n_pubs == null ? "未知" : item._source.n_pubs }}
            </div>
            <div class="text">
              被引用次数:
              {{
                item._source.n_citation == null
                  ? "未知"
                  : item._source.n_citation
              }}
            </div>
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
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      search_query: null,
      searchAuthors: [
        // {
        //   _source: {
        //     tags: [
        //       {
        //         t: "1",
        //       },
        //     ],
        //   },
        // },
      ],
    };
  },
  methods: {
    back() {
      this.$router.push("/firstPage");
    },
    toPersonalInfo(id) {
      console.log(1);
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

<style lang="scss" scoped>
.main {
  min-height: 100vh;
}

.title {
  color: #003b55;
  font-weight: 600;
  font-size: large;
  text-align: left;
  margin-top: 1vh;
  margin-bottom: 1vh;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    border-radius: 10px;
    background: rgba(198, 212, 220, 0.457);
    // margin-bottom: 5px;
    padding: 5px;
    z-index: 99;
    transform: scale(102%);
    // border: solid 2px #003b55;
  }
  &:active {
    transform: scale(95%);
  }
}
.subtitle {
  font-weight: 700;
}
.avatar {
  cursor: pointer;
}

.text {
  text-align: left;
  font-size: small;
}
.content {
  width: 70%;
  margin: auto;
}

.cards {
  margin-top: 3vh;
  margin-left: 10vw;
  margin-right: 10vw;
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
