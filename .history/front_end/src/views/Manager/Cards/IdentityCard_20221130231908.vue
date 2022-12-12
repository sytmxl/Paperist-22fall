<template>
  <div class="main">
    <h1>申诉文献名: {{ info.name }}</h1>
    <span>
      <h2>作者: {{ info.author }}</h2>
    </span>
    <h2>申述内容:</h2>
    <p class="abstract">{{ info.content }}</p>
  </div>
</template>

<script>
export default {
  name: "IdentityCard",
  data() {
    return {
      info: {
        name: "Denoising Diffusion Probabilistic Models",
        author: "Jonathan HoAjay JainPieter Abbeel",
        content:
          "我们使用扩散概率模型呈现了高质量的图像合成结果，这种模型是受非平衡热力学考量启发的一种隐变量模型。我们的最佳结果是通过根据扩散概率模型和基于Langevin动力学的得分匹配模型的新连接设计的加权变分边界进行训练而获得的，并且我们的模型天然地承认是一种渐进式有损解压方案，也可以被解释为自回归解码的一种泛化。",
      },
    };
  },
};
</script>

<style>
.main {
  margin-left: 5%;
  margin-right: 5%;
  text-align: left;
}

.abstract {
  color: #919fb5;
  text-align: left;
}
</style>
