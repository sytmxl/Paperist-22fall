<template>
  <el-container id="SearchInformation">
<!--    顶栏-->
    <el-header height="calc(10vh)">
    <search-bar/>
    </el-header>
    <el-container>
<!--      左侧栏-->
      <el-aside >
        <h3 style="text-align: left; margin-left: 10%;">二次搜索筛选</h3>
        <div>
          <el-card style="background: #B3C0D1; margin-bottom: 10px">
            <!--        复选框组1-->
            <el-checkbox-group  v-model="secondarySearchFilters01" size="mini">
              <el-checkbox border v-for="filter in filterGroup01" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-card>
          <el-card style="background: #B3C0D1; margin-bottom: 10px">
            <!--        复选框组2-->
            <el-checkbox-group v-model="secondarySearchFilters02" size="mini">
              <el-checkbox border v-for="filter in filterGroup02" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-card>
        </div>

      </el-aside>
<!--      搜索结果-->
      <el-main>
        <h3 >搜索结果</h3>
        <div>
          <el-card style="background: #B3C0D1; min-height: calc(75vh)">
            <el-card v-for="searchResult in searchResults" :key="searchResult" v-loading = "true"
                     style = "height: 150px;margin-bottom: 10px">
              <!-- TODO 之后需要复用搜索结果的卡片-->
              <h5 style="margin-left: 10%; text-align: left;">{{searchResult}}</h5>
              <search-item></search-item>
            </el-card>
          </el-card>
        </div>
      </el-main>
<!--右侧栏-->
      <el-aside>
        <h3 style="text-align: right; margin-left: 10%">推荐</h3>
        <el-card style="background: #B3C0D1">
          <el-card v-for="recommend in recommends" :key="recommend" v-loading = "true"
                   style = "height: 75px;margin-bottom: 10px">
            <h5 style="margin-left: 10%; text-align: left;">{{recommend}}</h5>
          </el-card>
        </el-card>
      </el-aside>

    </el-container>

  </el-container>
</template>

<script>

import SearchBar from "@/components/SearchBar";
export default {
  name:"SearchInformation",
  components: {SearchBar},
  props :{
  },
  data() {
    return{
      //二次搜索标签
      filterGroup01 : ['阿巴阿巴', '随便什么', '长度', '不一样','的字符串们', '交错的效果', '嗯'
        , '其实这样','看起来还是挺乱的', '真的', '我懒得改样式', '因为', '这实在', '太麻烦了'],
      filterGroup02 : ['随便', '填点', '什么东西', '意思意思吧：','我', '讨厌', '前端'
        , 'html','vue', 'JavaScript', 'css','真的烦','啊啊啊啊'],
      secondarySearchFilters01 : ['阿巴阿巴'],
      secondarySearchFilters02 : ['前端'],
      //搜索结果，暂时留白
      searchResults : ['结果A','结果B','结果A','结果B','结果A','结果B','结果A','结果B','结果A','结果B','结果A','结果B',],
      //推荐栏，暂时留白
      recommends : ['随便','在这里','推荐点什么','a','b',]
    }
  },
  methods :{

  }
}
</script>