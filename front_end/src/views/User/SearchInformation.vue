<template>
  <el-container id="SearchInformation" class="light-mode">
<!--    顶栏-->
    <el-header>
    <search-bar/>
    </el-header>
    <el-container style="width: calc(80vw);align-self: center">
<!--      左侧栏-->
      <el-aside style="max-width: calc(20vw); margin-top: calc(5vh)">
        <div>
          <el-card style="margin-bottom: 10px" class="display_zone" shadow="never">
            <!--        复选框组1-->
            <el-checkbox-group  v-model="secondarySearchFilters01" size="mini">
              <el-checkbox border v-for="filter in filterGroup01" :label="filter" :key="filter"
                           style="background: white; margin: 1% ;float: left"/>
            </el-checkbox-group>
          </el-card>
          <el-card style="margin-bottom: 10px" class="display_zone">
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
        <el-row :gutter="20">
          <el-col :span="16" style="text-align: left; margin-left: 6%; margin-bottom: 3%; color: #B3C0D1">找到约{{toThousands(resultNum)}}条相关结果</el-col>
          <el-col :span="4" style="text-align: left; margin-left: 6%; margin-bottom: 3%; color: #B3C0D1">
            <el-dropdown style="display: inline-block">
              <span>
                <span style="cursor: pointer;color: #B3C0D1">
                  {{sortMethod}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>默认</el-dropdown-item>
                  <el-dropdown-item>引用量</el-dropdown-item>
                  <el-dropdown-item>日期</el-dropdown-item>
                </el-dropdown-menu>
              </span>
            </el-dropdown>
            <i style="display: inline-block; margin-left: 10%" class="el-icon-sort" @click="sortReserve"></i>
          </el-col>
        </el-row>

        <div>
          <el-card style="min-height: calc(75vh)" class="display_zone" shadow="never">
            <paper-card v-for="searchResult in searchResults"
                        style="margin-top: calc(1vh)"
            />
          </el-card>
        </div>
      </el-main>
<!--右侧栏-->
      <el-aside style="max-width: calc(20vw); margin-top: calc(5vh)">
        <el-card class="display_zone" shadow="never">
          <h3 style="text-align: left; margin-left: 5%; margin-bottom: calc(2vh)">推荐</h3>
          <el-card v-for="recommend in recommends" :key="recommend" v-loading = "true" shadow="never"
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
import PaperCard from "@/components/PaperCard";
import PaperInformation from "@/views/User/PaperInformation";
import {$data} from "../../../static/pdf/build/pdf.worker";
export default {
  name:"SearchInformation",
  components: {PaperInformation, PaperCard, SearchBar},
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
      recommends : ['随便','在这里','推荐点什么','a','b',],
      resultNum : 2333333,
      sortMethod : "默认",
      sortReserve : false
    }
  },
  methods :{
    toThousands(num) {
      var result = [ ], counter = 0;
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('');
    },
    reserveSort(){$data.sortReserve = !$data.sortReserve;}

  }
}
</script>
