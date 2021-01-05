
Page({
    data: {
        list: [
            {
                id: 'form',
                name: '表单',
                open: false,
                pages: ['cell', 'slideview', 'form', 'uploader'],
                config: {
                  name: '恭喜中大奖',
                  img: "https://baidu.jpg",
                  title: "4233"
                }
            },
            {
                id: 'widget',
                name: '基础组件',
                open: false,
                pages: [
                    'article',
                    'icons',
                    'badge',
                    'flex',
                    'footer',
                    'gallery',
                    'grid',
                    'loadmore',
                    'loading',
                    'panel',
                    'preview'
                ]
            },
            {
                id: 'feedback',
                name: '操作反馈',
                open: false,
                pages: ['dialog', 'msg', 'half-screen-dialog', 'actionsheet', 'toptips']
            },
            {
                id: 'nav',
                name: '导航相关',
                open: false,
                pages: ['navigation', 'tabbar']
            },
            {
                id: 'search',
                name: '搜索相关',
                open: false,
                pages: ['searchbar']
            }
        ],
        slideButtons: [
            {
                text: '删除',
                src: '/assets/image/icon_chat3.png', // icon的路径
                extClass: 'delete-icon'
            }
        ]
    },
    onLoad: function(){
        let prizesConfig = JSON.parse(wx.getStorageSync('prizesConfig'))
        console.log(prizesConfig)
        let list = prizesConfig.map((item, index)=> {
                    var obj = Object.create(null)
                    obj.id = index+1
                    obj.open = false
                    obj.config = item
                    return obj
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
        [`list[${index}].config.${key}`]: e.detail.value
      })
    },
    slideButtonTap: function(e){
        console.log(e)
    }
})
