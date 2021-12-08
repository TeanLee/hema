//index.js
//获取应用实例
const app = getApp()

Page({
  // activeIndex 是当前播放图片的下标
  data: {
    activeIndex: 0,// 标记轮播到哪个图片
    scrollXList: [],// 滚动的商品列表
    goodsSorts: [], // 商品的十种分类   用于获取商品分类信息，显示在页面上
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
  linkToList: function(e) {
    // console.log(e.currentTarget.id);
    // 将用户点击的分类保存在全局变量中，用于页面跳转后的商品显示
    app.globalData.goodsSortsChoice = e.currentTarget.id;
    // console.log(app.globalData.goodsSortsChoice);
    wx.navigateTo({
      url: "../goodsList/goodsList"
    })
  },
  addInCart: function(e) {
    console.log(e);
    const good = this.data.scrollXList[e.currentTarget.id]; // 根据index，判断用户点击了哪个商品加入购物车
    const cart = app.globalData.cardList; // 获取购物车列表
    // 设置一个标记，判断用户想加入购物车的商品是否已经存在购物车了
    // some 是es6新增的方法，用于遍历整个数组，如果数组中存在一个及以上元素，就返回true
    var flag = false;
    flag = cart.some((item) => {
      return item === good;
    })
    console.log(flag);
    // 如果购物车中没有该元素，就将该商品加入购物车，否则就将该商品的购买数量加一
    if(!flag) {
      cart.push(good); // 用户选择商品加入购物车后，将该商品加入购物车列表
      wx.showToast({
        title: '商品已加入购物车',
        icon: 'success',
        duration: 2000
      })
    } else {
      this.data.scrollXList[e.currentTarget.id].count ++;
    }
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    wx.request({
      url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/getIndexScrollX",
      success: (res) => {
        // console.log(res.data);
        this.setData({
          scrollXList: res.data.data.goods
        })
        // console.log(res.data.data.goods);
      }
    })
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/index_goodsSort",
    //   success: (res) => {
    //     console.log(res.data.data);
    //     this.setData({
    //       goodsSorts: res.data.data.sorts
    //     })
    //   }
    // })
    this.setData({
      goodsSorts: ["https://gtms03.alicdn.com/tps/i3/TB1gXd1JXXXXXapXpXXvKyzTVXX-520-280.jpg"]
    })
  },
  getUserInfo: function(e) {
    
  }
})
