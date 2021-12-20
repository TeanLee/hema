//index.js
//获取应用实例
const app = getApp()

Page({
  // activeIndex 是当前播放图片的下标
  data: {
    activeIndex: 0,// 标记轮播到哪个图片
    scrollXList: [],// 滚动的商品列表
    goodsSorts: [], // 商品的十种分类   用于获取商品分类信息，显示在页面上
    icons: [], // 首页商品分类
    scrollXList: [], // “今日王牌大赏所有内容”

    show: true,
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  scan: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 点击不同的小圆点切换不同的图片
  changeTag:  function(e){
    var type = e.target.dataset.index;
    this.setData({
      activeIndex: type
    });
  },
  // 滑动切换图片，获取点击的下标，改变相应小圆点的状态
  swiperTab: function(e){
    var type = e.detail.current;
    this.setData({
      activeIndex: type
    });
  },
  chooseAddr: function() {
    wx.navigateTo({
      url: "../chooseAddress/chooseAddress"
    })
  },
  linkToList: function(e) {
    // 将用户点击的分类保存在全局变量中，用于页面跳转后的商品显示
    app.globalData.goodsSortsChoice = e.currentTarget.id;
    // console.log(app.globalData.goodsSortsChoice);
    wx.navigateTo({
      url: "../goodsList/goodsList?selectedId=" + e.currentTarget.id,
    })
  },
  addInCart: function(e) {
    const { productid } = e.currentTarget.dataset;
    this.addToCart(productid);
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    wx.request({
      url: "http://localhost:8080/product/list",
      success: (res) => {
        this.setData({
          scrollXList: res.data
        })
      }
    })
    wx.request({
      url: "http://localhost:8080/category",
      success: (res) => {
        this.setData({
          icons: res.data
        })
      }
    })
    this.setData({
      goodsSorts: ["https://gtms03.alicdn.com/tps/i3/TB1gXd1JXXXXXapXpXXvKyzTVXX-520-280.jpg"]
    })
  },
  bindGetUserInfo: function(res) {
    console.log("bindGetUserInfo");
    var that = this
    // getUserProfile
    wx.getUserProfile({
      desc: '展示用户信息',    //不能为空
        success(res){
          const { nickName } = JSON.parse(res.rawData);
          console.log(nickName);
          that.postUsername(nickName);
          that.setData({
            wechat_name:res.userInfo.nickName,
            headimgurl:res.userInfo.avatarUrl,
            province:res.userInfo.province,
            country:res.userInfo.country,
            gender:res.userInfo.gender,
            city:res.userInfo.city,
        })
        wx.showToast({
          title: '授权成功!', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }      
    })
    this.setData({ show: false });
   },
  // 向后端发送当前用户名信息
  postUsername: function(username) {
    wx.request({
      url: 'http://localhost:8080/user/login',
      method: "POST",
      data: {
        "username": username
      },
      // 请求中带参数时，需要指定请求头中的内容，否则后端会识别失败（则默认content-type为application/json）
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
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
  getUserInfo: function(e) {
    
  }
})
