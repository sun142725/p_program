import * as echarts from '../../ec-canvas/echarts';

Page({

  data: {
    ec: {
      lazyLoad: true
    }
  },

  onReady() {
    let _this = this
    var ecComponent = _this.selectComponent("#mychart-dom-bar")
    ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      _this.setOption(chart);
      console.log('打印chat', chart)
      this.chart = chart;
      return chart;
    });

  },
  setOption(chart){
    var option = {
      color: ['#37a2da', '#32c5e9', '#67e0e3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
      legend: {
        data: ['热度']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '吃饭',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [300, 270, 340, 344, 300, 320, 310, 13, 124,212, 414],
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          },
        }
      ]
    };
    chart.setOption(option)
  },
  onShareAppMessage: function (res) {
    return {
      title: '禁止分享',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
});
