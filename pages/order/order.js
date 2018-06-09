const app = getApp();
// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品展示的列表
    sum: 0, // 总的钱数
    allStatus: "circle" // 商品是否全选的标志，很巧妙的是，这个标志可以定义小圆圈是钩还是空心圆
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cardList = app.globalData.cardList;
    cardList.map(item => {
      item.type = "success";
    });
    this.setData({
      // 页面加载时就给购物车显示商品数量
      goodsList: cardList
    });
    console.log(this.data.goodsList);
  },
  toSort: function() {
    wx.switchTab({
      url: "../shopping/shopping"
    })
  },
  // 计算所有商品的钱数
  sumMoney: function() {
    var count = 0;
    const goods = this.data.goodsList;
    for(let i = 0; i < goods.length; i++) {
      count += goods[i].count*goods[i].price;
    }
    this.setData({
      sum: count
    })
  },
  toOrder: function() {
    wx.navigateTo({
      url: "../order/order"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      // 页面加载时就给购物车显示商品数量
      goodsList: app.globalData.cardList
    });
    this.sumMoney();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})