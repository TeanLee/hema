//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activeIndex: 0,
    scrollXList: []
  },
  scan: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  changeTag:  function(e){
    var type = e.target.dataset.index;
    this.setData({
      activeIndex: type
    });
  },
  swiperTab: function(e){
    var type = e.detail.current;
    this.setData({
      activeIndex: type
    });
  },
  chooseAddr: function() {
    wx.navigateTo({
      url: "../chooseAddress/chooseAddress"
    })
  },
  linkToList: function() {
    wx.navigateTo({
      url: "../goodsList/goodsList"
    })
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    wx.request({
      url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/getIndexScrollX",
      success: (res) => {
        console.log(res.data);
        this.setData({
          scrollXList: res.data.data.goods
        })
        console.log(res.data.data.goods);
      }
    })
  },
  getUserInfo: function(e) {
    
  }
})
