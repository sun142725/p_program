
Page({
    data: {
        list: [],
        slideButtons: [
            {
                text: '删除',
                src: '/assets/image/icon_chat3.png', // icon的路径
                extClass: 'delete-icon'
            }
        ]
    },
    onLoad: function(){
        this.init()
    },
    init(){
        let prizesConfig = JSON.parse(wx.getStorageSync('prizesConfig'))
        let list = prizesConfig.map((item, index)=> {
                    item.id = index+1
                    // item.open = false
                    return item
                })
                this.setData({
                    list: list
                })
    },
    kindToggle: function (e) {
        const id = e.currentTarget.id,
            list = this.data.list
        for (let i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        })
    },
    inputHandler: function(e){
      console.log(e)
      let { index, key } = e.currentTarget.dataset
      this.setData({
        [`list[${index}].${key}`]: e.detail.value
      })
    },
    slideButtonTap: function(e){
        console.log(e)
    },
    save(){
        wx.setStorageSync('prizesConfig', JSON.stringify(this.data.list))
    },
    cancel(){
        this.init()
    }
})
