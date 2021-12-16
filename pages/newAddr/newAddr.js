// pages/newAddr/newAddr.js
Page({

  /**
   * 页面的初始数据，用户输入的收货地址、门牌号、姓名、联系电话
   */
  data: {
    address: '',
    name: '',
    phone: ''
  },
  backToChooseAddr: function() {
    wx.navigateTo({
      url: "../chooseAddress/chooseAddress"
    });
  },
  getAddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  getNum: function(e) {
    this.setData({
      num: e.detail.value
    })
  },
  getName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 用户点击保存后，对输入的数据进行存储，并反馈存储状态
  saveInfo: function() {
    wx.setStorage({
      key: "name",
      data: [{address:this.data.address}, {num: this.data.num}, {name: this.data.name}, {phone: this.data.phone}],
      success: function() {
        wx.showToast({
          title: "地址保存成功",
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: "../chooseAddress/chooseAddress"
          })
        },1000);
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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