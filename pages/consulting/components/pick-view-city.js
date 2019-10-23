// pages/consulting/components/pick-view.js
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
    cityIndex: [0,0]
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
      this.triggerEvent('confirmCity', this.data.cityIndex)
      this.cancelbtn()
    },
    bindchange(e){
      console.log(e.detail.value)
      this.setData({
        cityIndex: e.detail.value
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
