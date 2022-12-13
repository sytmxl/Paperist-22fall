<template>
  <div>
    <div id="chart2"></div>
  </div>
</template>
<!-- 引用示例 -->
<!-- <RelationShip
:Mname="username"
:relations="RelationsData"
:val="showRelation"
></RelationShip>
showRelation: true,
RelationsData: [
  {
    name: "皮蓬",
    value: 3,
    id: 1,
  },
  {
    name: "ss",
    value: 4,
    id: 2,
  },
  {
    name: "ssaw",
    value: 40,
    id: 3,
  }
], -->
<script>
import * as echarts from "echarts";
export default {
  name: "Relations",
  props: {
    relations: {
      type: Array,
      default() {
        return [];
      },
    },
    Mname: {
      type: String,
      default() {
        return "";
      },
    },
    val: {
      type: Boolean,
      default() {
        return "";
      },
    },
  },
  watch: {
    relations: {
      handler(newValue, oldValue) {
        this.myChart.clear();
        this.getData();
        //console.log("Relation Changes", newValue);
        //console.log(this.chartDom);
        //console.log(this.myChart);
      },
    },
    // 学者名字变化
    Mname: {
      handler(newValue, oldValue) {
        this.myChart.clear();
        this.getData();
      },
    },
    val: {
      handler(newValue, oldValue) {
        alert(1111);
        this.myChart.clear();
        this.getData();
      },
    },
  },

  data() {
    return {
      chartPie: "",
      typeName: [],
      typeNum: [],
      data_: [],
      myChart: "",
      chartDom: "",
      Data: [],
      category: [],
      links: [],
    };
  },

  created() {},
  mounted() {
    //console.log("6666666");
    //console.log("Relations", this.relations);
    //console.log(this.Mname);
    this.chartDom = document.getElementById("chart2");
    //console.log(this.chartDom);
    this.myChart = echarts.init(this.chartDom);
    this.getData();
  },

  methods: {
    // getScholar_info(name) {
    //   var id;
    //   var url = "/user/get_scholar_id";
    //   var data = {
    //     name: name,
    //   };
    //   this.$http.post(url, data).then((res) => {
    //     id = res.data.id;
    //   });
    //   return id;
    // },
    dealData() {
      this.Data = [];
      this.category = [];
      this.links = [];
      var color = [
        "#FF5403",
        "#1687A7",
        "#84DFFF",
        "#5E454B",
        "#FF87CA",
        "#FFCE45",
        "#94DAFF",
        "#28FFBF",
        "#17D7A0",
        "#9B3675",
      ];
      var item = {
        name: this.Mname,
        // draggable: true,
        symbolSize: [25, 25],
        itemStyle: {
          color: "#CD1818",
        },
        category: this.Mname,
        label: {
          show: true,
          fontWeight: "Bold",
        },
      };
      var itemName = { name: this.Mname };
      this.category.push(itemName);
      this.Data.push(item);
      var len = this.relations.length;
      var link;
      for (let i = 0; i < len; i++) {
        let value = this.relations[i].value + 10;
        item = {
          name: this.relations[i].name,
          //   draggable: true,
          symbolSize: [value, value],
          itemStyle: {
            color: color[(i + 1) % color.length],
          },
          category: this.relations[i].name,
        };
        this.Data.push(item);
        itemName = {
          name: this.relations[i].name,
        };
        this.category.push(itemName);
        link = {
          target: this.relations[i].name,
          source: this.Mname,
          category: this.relations[i].value,
        };
        this.links.push(link);
      }
    },
    getData() {
      var myChart = this.myChart;
      var option;
      this.dealData();
      option = {
        // backgroundColor: "#ccc", // 背景颜色
        title: {
          // 图表标题
          // text: "学者关系图",
          left: "3%", // 标题距离左侧边距
          top: "3%", // 标题距顶部边距
          textStyle: {
            // 标题样式
            color: "#000", // 标题字体颜色
            fontSize: "30", // 标题字体大小
          },
        },
        // 鼠标悬停在node或者edge上显示相应信息
        tooltip: {
          formatter: function (param) {
            //console.log("参数是");
            //console.log(arguments);
            if (param.dataType === "edge") {
              return (
                param.data.target +
                "与" +
                param.data.source +
                "共合作过" +
                param.data.category +
                "篇文章"
              );
            }
            return param.data.name;
          },
        },

        series: [
          {
            type: "graph", // 系列类型:关系图
            top: "10%", // 图表距离容器顶部的距离
            layout: "force",
            symbol: "circle",
            draggable: true,
            force: {
              // 力引导布局相关的配置项，力引导布局是模拟弹簧电荷模型在每两个节点之间添加一个斥力，每条边的两个节点之间添加一个引力，每次迭代节点会在各个斥力和引力的作用下移动位置，多次迭代后节点会静止在一个受力平衡的位置，达到整个模型的能量最小化。
              // 力引导布局的结果有良好的对称性和局部聚合性，也比较美观。
              //   initLayout: "circular", // 初始布局，默认为circular
              repulsion: 300, // [ default: 50 ]节点之间的斥力因子(关系对象之间的距离)。支持设置成数组表达斥力的范围，此时不同大小的值会线性映射到不同的斥力。值越大则斥力越大
              edgeLength: [115, 100], // [ default: 30 ]边的两个节点之间的距离(关系对象连接线两端对象的距离,会根据关系对象值得大小来判断距离的大小)，
              // 这个距离也会受 repulsion。支持设置成数组表达边长的范围，此时不同大小的值会线性映射到不同的长度。值越小则长度越长。如下示例:
              // 值最大的边长度会趋向于 10，值最小的边长度会趋向于 50      edgeLength: [10, 50]
            },
            circular: {
              rotateLabel: true,
            },
            focusNodeAdjacency: true,
            legendHoverLink: true,
            lineStyle: {
              // 关系边的公用线条样式。其中 lineStyle.color 支持设置为'source'或者'target'特殊值，此时边会自动取源节点或目标节点的颜色作为自己的颜色。
              normal: {
                color: "target", // 线的颜色[ default: '#aaa' ]
                width: 2, // 线宽[ default: 1 ]
                type: "solid", // 线的类型[ default: solid ]   'dashed'    'dotted'
                opacity: 0.5, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。[ default: 0.5 ]
                curveness: 0.3, // 边的曲度，支持从 0 到 1 的值，值越大曲度越大。[ default: 0 ]
              },
            },
            label: {
              show: true,
              position: "top",
              formatter: "{b}",
            },
            data: this.Data,
            categories: this.category,
            links: this.links,
          },
        ],

        animationEasingUpdate: "quinticInOut", // 数据更新动画的缓动效果。[ default: cubicOut ]    "quinticInOut"
        animationDurationUpdate: 100,
      };
      let that = this;
      option && myChart.setOption(option, true);

      myChart.on("click", function (params) {
        // 如果是当前学者的话，就不跳转
        if (params.data.name === that.Mname) {
          //console.log(that.Mname);
        } else {
          for (var i = 0; i < that.relations.length; i++) {
            if (that.relations[i].name === params.data.name) {
              if (that.relations[i].id === 0) {
                window.location.href =
                  "/result?input=" + params.data.name + "&type=4";
              } else {
                // let routeData = that.$router.resolve({
                //   name: "personalInformation",
                //   params: { id: that.relations[i].id },
                // });
                window.open("" + that.relations[i].id, "_blank");
                // window.location.href = "" + that.relations[i].id;
              }
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#chart2 {
  height: 500px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px hsla(0, 0%, 92.5%, 0.5);
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
