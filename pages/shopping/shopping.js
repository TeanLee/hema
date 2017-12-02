const app = getApp();
// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsList: app.globalData.cardList
    })
  },
  addCount:function (e) {
    var that = this;
    console.log(e);
    const goodId = e.currentTarget.id;
    console.log(that.data.goodsList[goodId]);
    that.data.goodsList[goodId].count++;
    console.log(that.data.goodsList[goodId]);
  },
  reduceCount: function(e) {
    var that = this;
    const goodId = e.currentTarget.id;
    // console.log(that.data.goodsList[goodId]);
    if(that.data.goodsList[goodId].count <= 0) {
      that.data.goodsList[goodId].count = 1;
      wx.showModal({
        title: '数量小于1',
        content: '不允许操作',
        duration: 2000
      })
    } else {
      that.data.goodsList[goodId].count--;
    }
    // console.log(that.data.goodsList[goodId]);
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
    console.log(this.data.goodsList);
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