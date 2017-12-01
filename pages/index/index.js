//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activeIndex: 0
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
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    
  }
})
