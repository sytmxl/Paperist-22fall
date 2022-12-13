<template>
  <el-card class="box-card" @click="goto_paper(paper_id)">
    <div slot="header" class="clearfix">
      <span
        @click="goto_paper(paper_id)"
        style="cursor: pointer"
        title="了解此论文"
        >{{ name }}</span
      >
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div class="text item">摘要：{{ limitWords(intro) }}</div>
    <div class="text item">
      作者：
      <span
        v-for="i in author"
        :key="i"
        style="margin-right: 20px"
        @click="goto_person(i.name)"
      >
        {{ i.name }}
      </span>
    </div>
    <div class="text item">来源：{{ origin.raw }}</div>
    <div class="text item">引用量：{{ cite }}</div>
    <div class="text item">发表时间：{{ date }}</div>
  </el-card>
</template>

<script>
export default {
  mounted() {
    if (this.$props.title == null) this.$props.title = "未知名称";
    if (this.$props.author == null) this.$props.author = "未知作者";
    if (this.$props.intro == null) this.$props.intro = "未知摘要";
    if (this.$props.origin == null||!(raw in this.$props.origin)) this.$props.origin = { raw: "未知来源" };
    if (this.$props.cite == null) this.$props.cite = "未知引用量";
    if (this.$props.date == null) this.$props.date = "未知发表时间";
  },
  props: {
    name: { default: "" },
    author: { default: "" },
    intro: { default: "" },
    origin: { default: "" },
    cite: { default: "" },
    date: { default: "" },
    paper_id: "",
  },
  methods: {
    limitWords(txt) {
      let str = txt;
      if (str == null) return "未知";
      if (str.length > 500) str = str.substr(0, 500) + "......";
      return str;
    },
    goto_paper(paper_id) {
      // this.$router.push({
      //     name:'PaperInformation',
      //     params:{
      //      paper_id:paper_id
      //     }
      //   })
      //   window.location.reload()

      let routeData = this.$router.resolve({
        name: "PaperInformation",
        params: { paper_id: paper_id },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-card {
  width: auto !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  border: solid 1px #003b55a7 !important;

  background: none;
  margin-bottom: 15px !important;
}
.dark-mode {
  .el-card {
    background-color: rgba(255, 255, 255, 0);
    // border: none !important;
    border-color: rgba(215, 215, 215, 0.691);
    // color: rgb(245, 245, 245) !important;
    // backdrop-filter: blur(20px) brightness(100%);
  }
}
/deep/.el-card__header {
  background-color: #003b55 !important;
  color: white;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    // background: rgb(231, 231, 231) !important;
    cursor: pointer;
    transform: scale(102%);
    background-color: #003b55a3 !important;
  }
}
</style>
