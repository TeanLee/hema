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
    const selectedId = options.selectedId; // 获取跳转页面传递过来的id
    wx.request({
      // 获取所有分类的商品信息
      url: "http://localhost:8080/product/get-by-category-id",
      data: {
        categoryId: selectedId
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          // app.globalData.goodsSortsChoice从全局变量中获取上一步用户点击的分类是哪一个
          goods: res.data
        })
      }
    })
  },
  toSort: function() {
    wx.switchTab({
      url: "../shopping/shopping"
    })
  },
  addInCart: function(e) {
    const { productid } = e.currentTarget.dataset;
    this.addToCart(productid);
  },
  addToCart: function(productId) {
    wx.request({
      url: "http://localhost:8080/shopping-cart/add",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "productId": productId
      },
      success: (res) => {
        wx.showToast({
          title: '加购成功!', // 标题
          icon: 'success',
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
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