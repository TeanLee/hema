const API = require("../../api/main");
const app = getApp();
// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品展示的列表
    sum: 999, // 总的钱数
    checked: true,
    result: [],
    checked: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShoppingCartProducts();

    this.clearSelected();
    // 页面加载完成前就开始计算总钱数用于显示
    this.sumMoney();
  },
  onChange(event) {
    this.setData({
      result: event.detail,
    });
  },
  onChangeCheckbox(event) {
    this.setData({
      checked: event.detail,
    });
  },
  switchSelect(event) {
    const { index } = event.currentTarget.dataset;
    
    const tempList = this.data.goodsList;
    if(tempList[index].selected == true) {
      tempList[index].selected = false;
    } else {
      tempList[index].selected = true;
    }

    this.setData({
      goodsList: tempList
    })

    this.sumMoney();
  },
  getShoppingCartProducts: function() {
    this.setData({
      loading: true
    })
    API.getShoppingCart().then(res => {
      res.forEach(element => {
        element.selected = false
      });
      this.setData({
        goodsList: res,
        loading: false
      })
    })
  },
  submitOrder() {
    const { goodsList } = this.data;
    const orders = [];
    goodsList.forEach(item => {
      if(item.selected) {
        orders.push({
          "productId": item.productId,
          "count": item.count
        })
      }
    })
    console.log(orders);

    API.addOrder({
      "orderItem": orders
      // 'content-type': 'application/json' // 说明向后端传递的是 json 数据
    }, "json").then(() => {
      wx.showToast({
        title: '订单提交成功!', // 标题
        icon: 'success',
        duration: 1500  // 提示窗停留时间，默认1500ms
      })
      // 订单提交成功后，要在购物车表中删除已经购买的数据
      this.getShoppingCartProducts();
      this.clearSelected();
      this.sumMoney(); // 提交订单后，需要重新计算选中商品的钱数
    })
  },
  // 增加商品数量
  addCount:function (e) {
    var that = this;
    const goodId = e.currentTarget.id;
    that.data.goodsList[goodId].count++;
    this.setData({
      goodsList: that.data.goodsList
    })
    this.sumMoney();

    API.addToCart({
      "productId": that.data.goodsList[goodId].productId
    })
  },
  // 减少商品数量
  reduceCount: function(e) {
    var that = this;
    const goodId = e.currentTarget.id;
    if(that.data.goodsList[goodId].count <= 1) {
      that.data.goodsList[goodId].count = 1;
      API.deleteCart({
        "productId": that.data.goodsList[goodId].productId
      }).then(() => {
        wx.showToast({
          title: '删除成功!', // 标题
          icon: 'success',
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
        this.getShoppingCartProducts();
      })
    } else {
      that.data.goodsList[goodId].count--;
      API.cutCartCount({
        "productId": that.data.goodsList[goodId].productId
      })
    }
    this.setData({
      goodsList: that.data.goodsList
    })
    this.sumMoney();
  },
  // 计算所有商品的钱数
  sumMoney: function() {
    var count = 0;
    const goods = this.data.goodsList;
    for(let i = 0; i < goods.length; i++) {
      if(goods[i].selected) {
        count += goods[i].count*goods[i].price;
      }
    }
    this.setData({
      sum: count.toFixed(2)
    })
  },
  // 删除商品
  delGoods: function() {
    const goods = this.data.goodsList;
    const cart = app.globalData.cardList; // 获取购物车列表
    const selGoods = goods.filter(good => good.type === "success");
    wx.showModal({
      title: "确定要删除所选商品？",
      success: (res) => {
        // 用户点击确定
        if(res.confirm) {
          // 对要删除的元素数组进行遍历，逐个用splice方法进行删除
          selGoods.map(sel => {
            const index = goods.indexOf(sel);
            goods.splice(index, 1);
            cart.splice(index, 1);
          })
          this.sumMoney();
          // 删除成功以后从新设置页面的值
          this.setData({
            goodsList: this.data.goodsList
          })
        } else if (res.cancel) {

        }
      }
    })
    this.sumMoney();
  },
  // 清空所有商品的选中状态
  clearSelected() {
    let tempList = this.data.goodsList;
    tempList.forEach(item => {
      item.selected = false;
    })
    this.setData({
      goodsList: tempList,
      result: []
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
    this.clearSelected();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getShoppingCartProducts();
    this.clearSelected();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clearSelected();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.clearSelected();
  },

  onTabItemTap: function (item) {
    this.clearSelected();
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