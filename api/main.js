// 小程序开发api接口统一配置
// 如果你的域名是： https://www.baidu.com/cn 那么这里只要填写 cn
let subDomain = ''  // 子域名,没有就等于''
const API_BASE_URL = 'http://localhost:8080'  // 主域名
 
 
const request = (url, method, data, type) => {
  let _url = API_BASE_URL + subDomain  + url
  let ContentType = 'application/json';
  if (method === "post" && type !== "json" || method === "delete") ContentType = 'application/x-www-form-urlencoded'
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': ContentType
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}
 
/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}
 
module.exports = {
  request,
  // 首页接口
  // 首页获取分类接口
  getCategory: () => request('/category','get'),
  // 首页列表接口
  getProductList: () => request('/product/list','get'),
  // 首页用户登录（获取用户名信息）
  login: (data) => request('/user/login','post', data),
  // 将商品加入购物车
  addToCart: (data) => request('/shopping-cart/add','post', data),
  // 减少商品数量
  cutCartCount: (data) => request('/shopping-cart/cut','post', data),
  // 删除购物车商品
  deleteCart: (data) => request('/shopping-cart/delete','delete', data),
 
  // 选择地址页面接口
  // 获取当前用户信息
  getUserInfo: () => request('/user/info','get'),


  // 商品列表页面（点击首页分类跳转的页面）
  getProductsByCategoryId: (data) => request('/product/get-by-category-id','get', data),

  // 创建地址页面
  // 修改收获地址、收件人等信息
  setUserInfo: (data) => request('/user/set-info','post', data),
  // 获取用户收货地址等信息
  getUserInfo: () => request('/user/info','get'),

  // 购物车页面
  // 获取当前用户购物车的所有商品
  getShoppingCart: () => request('/shopping-cart/all','get'),
  // 提交订单
  addOrder: (data, type) => request('/order/add','post', data, type),


  // 订单页面
  // 根据订单状态查询所有订单
  listOrders: (data) => request('/order/list-detail','get', data),
  // 修改订单状态（0:待付款；1:待配送；2:待评价）
  updateOrder: (data) => request('/order/update-status','post', data),

  //  商品详情页
  // 根据商品 id 获取商品详情
  getProductById: (data) => request(`/product/${data}`,'get'),
}