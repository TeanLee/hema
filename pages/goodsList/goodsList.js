const app = getApp();
// pages/goodsList/goodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: []
  },
  onLoad: function (options) {
    wx.request({
      url: "https://www.e加入asy-mock.com/mock/5a223b51707056548f086d8b/hema/getGoods",
      success: (res) => {
        console.log(res.data.data.goods);
        this.setData({
          goods: res.data.data.goods
        })
      }
    })
  },
  addInCart: function(e) {
    // console.log(this.data.goods);
    const good = this.data.goods[e.currentTarget.id]; // 根据index，判断用户点击了哪个商品加入购物车
    const cart = app.globalData.cardList; // 获取购物车列表
    cart.push(good); // 用户选择夹肉购物车后，将该商品加入购物车列表
    // console.log(e.currentTarget.id);
    // console.log(cart);
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