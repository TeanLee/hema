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
    console.log(cardList);
    this.setData({
      // 页面加载时就给购物车显示商品数量
      goodsList: cardList
    });
    // 页面加载完成前就开始计算总钱数用于显示
    this.sumMoney();
    // 页面加载完成前就判断完商品是否全选，并指定全选的状态
    this.allSelected();
  },
  // 增加商品数量
  addCount:function (e) {
    var that = this;
    console.log(e);
    const goodId = e.currentTarget.id;
    console.log(that.data.goodsList[goodId]);
    that.data.goodsList[goodId].count++;
    console.log(that.data.goodsList[goodId]);
    this.setData({
      goodsList: that.data.goodsList
    })
    this.sumMoney();
  },
  // 减少商品数量
  reduceCount: function(e) {
    var that = this;
    const goodId = e.currentTarget.id;
    // console.log(that.data.goodsList[goodId]);
    if(that.data.goodsList[goodId].count <= 1) {
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
    this.setData({
      goodsList: that.data.goodsList
    })
    this.sumMoney();
  },
  // 计算所有商品的钱数
  sumMoney: function() {
    var count = 0;
    const goods = this.data.goodsList;
    console.log(goods);
    for(let i = 0; i < goods.length; i++) {
      // console.log(goods[i].count);
      // console.log(goods[i].price);
      count += goods[i].count*goods[i].price;
    }
    // console.log(count);
    this.setData({
      sum: count
    })
  },
  selectGoods: function(e) {
    // console.log(e.currentTarget.id);
    // 根据index找到用户点击的是哪一件商品
    const selected = this.data.goodsList[e.currentTarget.id];
    // 改变选中商品的type属性  通过这种方式标记出哪些商品被选中了，以及改变最前面是钩还是圆圈
    if(selected.type === "success") {
      selected.type = "circle";
    } else {
      selected.type = "success";
    }
    this.setData({
      goodsList: this.data.goodsList
    })
    this.allSelected();
  },
  // 用来判断是否全选
  allSelected: function() {
    const goods = this.data.goodsList;
    console.log(goods);
    var symbol = goods.some(good => {
      return good.type === "circle"
    })
    console.log(symbol);
    if(symbol) {
      this.data.allStatus = "circle"
    } else {
      this.data.allStatus = "success"
    }
    console.log(this.data.allStatus);
    this.setData({
      allStatus: this.data.allStatus
    })
  },
  selOrUnsel: function() {
    // console.log(this.data.allStatus);
    // 获得全选按钮和商品列表
    const status = this.data.allStatus;
    const goods = this.data.goodsList;
    // console.log(goods);
    // 点击按钮后查看当前全选框的状态，对其进行取反的改变，并且对商品进行全选或反选
    if(status === "success") {
      this.data.allStatus = "circle";
      // 遍历商品列表的每一项进行判断
      goods.map(good => {
        good.type = "circle";
      })
    } else {
      this.data.allStatus = "success";
      goods.map(good => {
        good.type = "success";
      })
    }
    // 将结果设置回页面上进行显示
    this.setData({
      goodsList: this.data.goodsList
    })
    this.setData({
      allStatus: this.data.allStatus
    })
  },
  // 删除商品
  delGoods: function() {
    const goods = this.data.goodsList;
    // 对购物车中所有的元素进行遍历，找出选中的元素，组成selGoods数组
    const selGoods = goods.map(good => {
      if(good.type === "success") {
        return good;
      }
    })
    wx.showModal({
      title: "确定要删除所选商品？",
      success: (res) => {
        // 用户点击确定
        if(res.confirm) {
          // 对要删除的元素数组进行遍历，逐个用splice方法进行删除
          selGoods.map(sel => {
            goods.splice(sel);
          })
          // 删除成功以后从新设置页面的值
          this.setData({
            goodsList: this.data.goodsList
          })
        } else if (res.cancel) {

        }
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