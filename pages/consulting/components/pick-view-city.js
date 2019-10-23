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
    showCity: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelbtn: function(){
      this.setData({
        showCity: false
      }, ()=>{
        this.setData({
          showCity: true
        })
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
