import Highcharts from '@/api/highcharts.js' //注意路径
import axios from '@/utils/axios'//导入axios

function getgossip() {
  axios({
      method: "get",
      url: "/gossip",
    })
    .then((res) => {
      var ui = {
        $grabMain: $(".gossip_main"),
      };
      var oConfig = window.oPageConfig;
      var interval = null;
      var move = null;
      var oPage = {
        init() {
          this.view();
        },
        view() {
          var self = this;
          var time = 1;
          var m = 0;
          var i = 0;
          var gossip = res.data.data;
          move = setInterval(function () {
            if (i < 20) {
              var fullwidth = Math.floor($(".gossip_main").outerWidth(true)); //;
              var fullheight = Math.floor($(".gossip_main").outerHeight(true)); //;
              var left = Math.floor(Math.random() * fullwidth * 0.8);
              var top = Math.floor(Math.random() * fullheight * 0.8);
              var shu = Math.floor(Math.random() * gossip.length);
              if (i != 19) {
                var gossip_item = $(
                  "<div class='gossip_random'>" + gossip[shu] + "</div>"
                );
              } else {
                var gossip_item = $(
                  "<div class='gossip_random'>" + gossip[0] + "</div>"
                );
              }
              var word_width = gossip[shu].length * 18.5;
              if (word_width > 220) {
                word_width = 220;
              }
              if (word_width + left > fullwidth) {
                left = fullwidth - 220;
              }
              gossip_item
                .css({
                  left: left,
                  top: top
                })
                .appendTo($(".gossip_main"));
              $(".gossip_random").eq(0).fadeOut(400);
              setTimeout(function () {
                $(".gossip_random").eq(0).remove();
              }, 700);
              i++;
            } else {}
          }, 1300);
        },
      };
      oPage.init();
    })
    .catch((error) => {
      console.log(error);
    });
}

function gethealth() {
  axios({
      method: "get",
      url: "/health",
    })
    .then((res) => {
      var healths = res.data.data;
      var array = [];
      for (var i = 0; i < healths.length; i++) {
        var temp = [];
        temp.push(new Date(healths[i].recordDate).getTime());
        temp.push(healths[i].weight);
        array.push(temp);
      }
      Highcharts.setOptions({
        lang: {
          resetZoom: '重置缩放比例', //汉化文字，默认是英文
        },
      });
      Highcharts.chart('health', {
        chart: {
          // type: 'area',
          backgroundColor: 'rgba(0,0,0,0)',
          animation: false, //关闭动画
          zoomType: 'x' //指定可缩放轴
          // height:500,
          // events:{load:getdata}
          // width:1240
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime', //设置x轴类型，这里是datetime
          dateTimeLabelFormats: { //设置时间轴的格式。当缩放不同大小显示不同的格式
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          },
          // ategories: myweight['time'],
          // categories: {{ health}},
          // labels: {enabled: false},
          minRange: 86400000 * 180 //设置坐标轴显示最小间隔。这里是2个月
        },
        yAxis: {
          title: {
            text: "公斤"
          }, //设置单位
          min: 55, //设置最小值
          tickInterval: 2, //步长
          max: 90, //设置最大值 　　　　　　　　　　　　　　
        },
        tooltip: {
          headerFormat: '{point.x:%Y-%m-%d}<br>', //设置显示格式
          pointFormat: '{point.y}公斤',
          // align: 'center',
          // style:{textAlign:"center",},
          shared: true
        },
        plotOptions: {
          area: {
            fillOpacity: 0.8, // 指定所有面积图的透明度
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          },
        },
        series: [{
          type: 'area', //如果是areaspline用曲线连接每个点
          name: '体重',
          data: array, //数据来源。这里是一组数据一个列表[日期,体重]
          // data: [],
          color: '#5B2AC9',
          fillColor: { // 设置渐变的填充颜色
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[4]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[5]).setOpacity(0).get('rgba')]
            ]
          },
        }, ],
        credits: {
          enabled: false
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
}


export { //很关键
  getgossip,
  gethealth
}