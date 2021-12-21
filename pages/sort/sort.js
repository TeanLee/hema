const API = require("../../api/main")
const app = getApp()
// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储在easymock中   界面需要的数据
    sortItems: [],
    activeKey: 0,
    sidebarSorts: [],
    loadingSidebar: false,
    loadingRight: false,
    products: [],
  },
  onChange(event) {
    console.log("onChangeonChange", event.detail);
    this.getProductsByCategoryId(event.detail);
  },
  getCategories() {
    this.setData({
      loadingSidebar: true
    })

    API.getCategory().then(res => {
      this.setData({
        sidebarSorts: res,
        loadingSidebar: false,
      })
    }).finally(() => {
      this.setData({
        loadingSidebar: false,
      })
    })
  },
  getProductsByCategoryId(activeKey) {
    this.setData({
      loadingRight: true
    })

    API.getProductsByCategoryId({
      "categoryId": activeKey
    }).then(res => {
      this.setData({
        products: res,
        loadingRight: false,
      })
    }).finally(() => {
      this.setData({
        loadingRight: false,
      })
    })
  },
  linkToList: function(e) {
    console.log(e.currentTarget.id);
    // 将用户点击的分类保存在全局变量中，用于页面跳转后的商品显示
    app.globalData.goodsSortsChoice = e.currentTarget.id;
    wx.navigateTo({
      url: "../goodsList/goodsList"
    })
  },
  addInCart(e) {
    const { productid } = e.currentTarget.dataset;
    API.addToCart({
      "productId": productid
    }).then(() => {
      wx.showToast({
        title: '加购成功!', // 标题
        icon: 'success',
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
    })
  },
  navigateToDetail(e) {
    const { productid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../productDetail/productDetail?productId=' + productid,
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
    this.getCategories();
    this.getProductsByCategoryId(0);
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