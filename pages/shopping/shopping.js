const app = getApp();
// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品展示的列表
    sum: 999, // 总的钱数
    allStatus: "circle", // 商品是否全选的标志，很巧妙的是，这个标志可以定义小圆圈是钩还是空心圆
    checked: true,
    result: [],
    checked: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShoppingCartProducts();

    this.data.goodsList.map(item => {
      item.selected = false;
    });
    // 页面加载完成前就开始计算总钱数用于显示
    this.sumMoney();
    // 页面加载完成前就判断完商品是否全选，并指定全选的状态
    this.allSelected();
  },
  onChange(event) {
    console.log(event.detail);
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
    console.log("switch Select：", index);
    
    const tempList = this.data.goodsList;
    if(tempList[index].selected == true) {
      tempList[index].selected = false;
    } else {
      tempList[index].selected = true;
    }

    this.setData({
      goodsList: tempList
    })

    this.allSelected();
    this.sumMoney();
  },
  getShoppingCartProducts: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/shopping-cart/all',
      success: (res) => {
        const { data } = res;
        data.forEach(element => {
          element.selected = false
        });
        this.setData({
          goodsList: data
        })
        console.log(data);
      }
    })
  },
  onClickButton() {
    console.log(this.data.goodsList);
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
    wx.request({
      url: "http://localhost:8080/shopping-cart/add",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "productId": that.data.goodsList[goodId].productId
      }
    })
  },
  // 减少商品数量
  reduceCount: function(e) {
    var that = this;
    const goodId = e.currentTarget.id;
    if(that.data.goodsList[goodId].count <= 1) {
      that.data.goodsList[goodId].count = 1;
      wx.request({
        url: "http://localhost:8080/shopping-cart/delete",
        method: "DELETE",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          "productId": that.data.goodsList[goodId].productId
        },
        success: (res) => {
          wx.showToast({
            title: '删除成功!', // 标题
            icon: 'success',
            duration: 1500  // 提示窗停留时间，默认1500ms
          })
        }
      })
      
    } else {
      that.data.goodsList[goodId].count--;
      wx.request({
        url: "http://localhost:8080/shopping-cart/cut",
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          "productId": that.data.goodsList[goodId].productId
        }
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
  selectGoods: function(e) {
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
    this.sumMoney();
  },
  // 用来判断是否全选
  allSelected: function() {
    const goods = this.data.goodsList;
    var symbol = goods.every(good => {
      return good.selected == true
    })
    this.setData({
      checked: symbol
    })
  },
  selOrUnsel: function() {
    // 获得全选按钮和商品列表
    const status = this.data.allStatus;
    const goods = this.data.goodsList;
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
    this.sumMoney();
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
  toOrder: function() {
    wx.navigateTo({
      url: "../order/order"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      // 页面加载时就给购物车显示商品数量
      goodsList: app.globalData.cardList
    });
    this.sumMoney();
    this.data.goodsList.map(item => {
      item.type = "success";
    });
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
    this.data.goodsList.map(item => {
      item.type = "success";
    });
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      // 页面加载时就给购物车显示商品数量
      goodsList: app.globalData.cardList
    });
    this.sumMoney();
    this.data.goodsList.map(item => {
      item.type = "success";
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      // 页面加载时就给购物车显示商品数量
      goodsList: app.globalData.cardList
    });
    this.sumMoney();
    this.data.goodsList.map(item => {
      item.type = "success";
    });
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