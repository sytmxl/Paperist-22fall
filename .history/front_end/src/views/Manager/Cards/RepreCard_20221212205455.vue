<template>
  <div class="main">
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
       <el-form
      v-show="Miss_Active === 0"
      :model="MissText"
      :rules="rules"
      ref="MissText"
      label-width="110px"
      class="demo-MissText"
      style="margin-top: 30px; padding-bottom: -20px"
      size="mini"
    >
      <el-form-item label="文献名称" prop="name">
        <el-input v-model="MissText.name"></el-input>
      </el-form-item>
      <el-form-item label="文献作者" prop="author">
        <el-input v-model="MissText.author">
          <el-dropdown slot="suffix" size="mini" placement="top-start">
            <i class="el-icon-warning-outline el-input__icon"> </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled
                >文章作者按顺序用顿号隔开</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown></el-input
        >
      </el-form-item>
      <el-form-item label="文献关键词" prop="keyword">
        <el-input
          v-model="MissText.keyword"
          placeholder="多个关键之间用逗号隔开"
        ></el-input>
      </el-form-item>
      <el-form-item label="文献发表日期" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="MissText.date"
          style="width: 100%"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="文献DOI" prop="doi">
        <el-input v-model="MissText.doi"></el-input>
      </el-form-item>
      <el-form-item label="文献摘要" prop="summary">
        <el-input type="textarea" v-model="MissText.summary"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RepreCard",
  data() {
    return {
      fileInfo: {
        name: "Denoising Diffusion Probabilistic Models",
        author: "Jonathan HoAjay JainPieter Abbeel",
        abstract:
          "我们使用扩散概率模型呈现了高质量的图像合成结果，这种模型是受非平衡热力学考量启发的一种隐变量模型。我们的最佳结果是通过根据扩散概率模型和基于Langevin动力学的得分匹配模型的新连接设计的加权变分边界进行训练而获得的，并且我们的模型天然地承认是一种渐进式有损解压方案，也可以被解释为自回归解码的一种泛化。",
      },
    };
  },
  methods:{
    goBack() {
        window.history.go(-1)
    }
  }
};
</script>

<style>
.main {
  margin-left: 5%;
  margin-right: 5%;
}

.abstract {
  color: #919fb5;
  text-align: left;
}
</style>
