<template>
  <div class="chart-container">
    <div id="mainLine3" style="width: 100%; height: 200px"></div>
  </div>
</template>
<!-- 使用 -->
<!-- <ScholarLine :data="data"> </ScholarLine>
data: [
{
  count: 1,
  content: "2017",
},
{
  count: 2,
  content: "2018",
},
], -->
<script>
import * as echarts from "echarts";
export default {
  name: "Line22",
  props: ["data", "name"],
  data() {
    return {
      chartPie: "",
      typeName: [],
      typeNum: [],
      data_: [],
      myChart: "",
      chartDom: "",
    };
  },
  created() {},
  mounted() {
    this.chartDom = document.getElementById("mainLine3");
    this.myChart = echarts.init(this.chartDom);
    this.getData();
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.myChart.clear();
        this.getData();
      },
    },
  },
  methods: {
    dealData() {
      this.typeName = [];
      this.typeNum = [];
      this.data_ = [];
      // this.data.sort(this.sortId);
      var data = this.data;
      console.log("this");
      var len = data.length;
      console.log(data);
      for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - i - 1; j++) {
          if (parseInt(data[j].content) > parseInt(data[j + 1].content)) {
            var swap = data[j].content;
            var num = data[j].count;
            // alert(swap.count);
            // console.log(swap.content);
            data[j].content = data[j + 1].content;
            data[j].count = data[j + 1].count;
            data[j + 1].content = swap;
            data[j + 1].num = num;
          }
        }
      }
      for (var i = 0; i < len; i++) {
        this.typeName.push(data[i].content);
        this.data_.push({
          name: data[i].content,
          value: data[i].count,
        });
        this.typeNum.push(data[i].count);
      }
    },

    getData() {
      var myChart = this.myChart;
      var option;
      this.dealData();
      console.log(this.typeNum);
      option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.typeName,
          splitLine: {
            show: true,
          },
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45",
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        legend: {
          data: ["引用数量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },

        color: "#CC00FF",
        yAxis: {
          type: "value",
          name: "引用数量",
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        // toolbox: {
        //     feature: {
        //     saveAsImage: {}
        //     }
        // },
        series: [
          {
            data: this.typeNum,
            type: "line",
            stack: "Total",
            smooth: true,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.3,
                      color: "#e0ecf8", // 0% 处的颜色
                    },
                    {
                      offset: 0.7,
                      color: "#e0ecf8", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
          },
        ],
      };
      option && myChart.setOption(option, true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
