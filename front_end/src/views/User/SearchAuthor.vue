<template>
  <div class="main">
    <div style="height: 10vh"></div>
    <div class="content">
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="back()">返回主页</el-button>
        </el-col>
        <el-col :span="20">
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <el-select
              style="width: 7vw"
              v-model="select"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option label="按名字" value="1"></el-option>
              <el-option label="按编号" value="2"></el-option>
              <el-option label="按文献" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="cards">
        <el-col
          :span="6"
          v-for="(item, index) in searchAuthors"
          :key="item"
          :offset="index % 3 > 0 ? 2 : 0"
        >
          <el-card style="margin-bottom: 3vh" :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>{{ item.name }}</span>
              <div class="bottom clearfix">
                <time class="time">2022.12.12</time>
                <el-button type="text" class="button">查看学者</el-button>
              </div>
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
      searchAuthors: [
        {
          name: "Ando",
        },
        {
          name: "Ando",
        },
        {
          name: "Ando",
        },
        {
          name: "Ando",
        },
      ],
    };
  },
  methods: {
    back() {
      this.$router.push("/firstPage");
    },
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
}

.content {
  margin-left: 15vw;
  margin-right: 15vw;
}

.cards {
  margin-top: 3vh;
  margin-left: 15vw;
  margin-right: 15vw;
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
