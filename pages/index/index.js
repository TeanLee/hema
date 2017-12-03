//index.js
//获取应用实例
const app = getApp()

Page({
  // activeIndex 是当前播放图片的下标
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
  // 点击不同的小圆点切换不同的图片
  changeTag:  function(e){
    var type = e.target.dataset.index;
    this.setData({
      activeIndex: type
    });
  },
  // 滑动切换图片，获取点击的下标，改变相应小圆点的状态
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
