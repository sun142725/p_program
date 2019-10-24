// pages/consulting/components/pick-view.js
// 仅仅适用于省市选择
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showCityPickView: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCity: false,
    cityIndex: [0,0],
    province: ['山西', '北京', '上海'],
    city: [1,2,3,4,5,6]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancelbtn: function(){
      console.log('dianjiquxiao', this)
      this.setData({
        showCity: false
      })
      setTimeout(()=>{
        this.setData({
          showCityPickView: false
        })
      }, 500)
    },
    confirmBtn(){
      var cityIndex = this.data.cityIndex
      this.triggerEvent('confirmCity', [this.data.province[cityIndex[0]], this.data.city[cityIndex[1]]])
      this.cancelbtn()
    },
    bindchange(e){
      console.log(e.detail.value)
      if (e.detail.value[0] != this.data.cityIndex[0]){
        this.getCityByProvince(e.detail.value[0])
      }
      this.setData({
        cityIndex: e.detail.value
      })
    },
    getProvince(){
      this.setData({
        province: ['山西', '北京', '上海']
      })
    },
    // 根据省获取市
    getCityByProvince(index){
      console.log('Province', index, this.data.province[index])
      this.setData({
        city: ['上海', '重庆', '233']
      })
    }
  },
  observers: {
    showCityPickView: function(newVal){
      console.log('newVal', newVal)
      if (newVal) {
        setTimeout(()=>{
          this.setData({
            showCity: true
          })
        }, 100)
      }
    }
  }
})
