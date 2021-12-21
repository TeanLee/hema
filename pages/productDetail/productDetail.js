// pages/productDetail/productDetail.js
const API = require("../../api/main")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        product: {},
        productId: "-1"
    },
    onClickLeft() {
        wx.navigateTo({
            url: "../shopping/shopping"
        })
    },
    addToCart() {
        API.addToCart({
            "productId": this.data.product.productId
        }).then(() => {
            wx.showToast({
                title: '加购成功!', // 标题
                icon: 'success',
                duration: 1500  // 提示窗停留时间，默认1500ms
            })
        })
    },
    onClickBuy() {
        API.addOrder({
            "orderItem": [{
                "count": 1,
                "productId": this.data.productId
            }]
            // 'content-type': 'application/json' // 说明向后端传递的是 json 数据
        }, "json").then(() => {
            wx.showToast({
                title: '订单提交成功!', // 标题
                icon: 'success',
                duration: 1500  // 提示窗停留时间，默认1500ms
            })
            setTimeout(() => {
                wx.navigateTo({
                    url: "../waitPayList/waitPayList?status=0" 
                })
            }, 1500);
        })
    },
    getProduct() {
        API.getProductById(this.data.productId).then(res => {
            this.setData({
                product: res
            })
        })
    },
    linkToShoppingCart() {
        wx.switchTab({
            url: "../shopping/shopping"
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let item = JSON.parse(options.productId);
        this.setData({productId: item});
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
        this.getProduct();
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