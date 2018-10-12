const app = getApp()
// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储在easymock中   界面需要的数据
    sortItems: []
  },
  linkToList: function(e) {
    console.log(e.currentTarget.id);
    // 将用户点击的分类保存在全局变量中，用于页面跳转后的商品显示
    app.globalData.goodsSortsChoice = e.currentTarget.id;
    wx.navigateTo({
      url: "../goodsList/goodsList"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/sortItems",
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          sortItems: res.data.data.sorts
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