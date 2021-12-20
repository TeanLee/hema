// pages/waitPay/waitpay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      ordersList: [],
      orderStatus: "-1"
    },

    changeStatus(e) {
      const { index } = e.currentTarget.dataset;
      wx.request({
        url: "http://localhost:8080/order/update-status",
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          "status": 1,
          "orderId": this.data.ordersList[index][0].orderId
        },
        success: (res) => {
          this.reload();
          wx.showToast({
            title: '支付成功!', // 标题
            icon: 'success',
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      const { status } = options;
      this.setData({
        orderStatus: status
      })
      this.reload(status);
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
      // this.reload();
    },

    reload(status) {
      wx.request({
        url: "http://localhost:8080/order/list-detail",
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        // 根据状态查询订单
        data:{
          "status": status === "undefined" ? "" : status
        },
        success: (res) => {
          this.setData({
            ordersList: res.data
          })
        }
      })
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