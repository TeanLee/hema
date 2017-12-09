冬天来了，寒风吹的瑟瑟发抖是不是不想出门啦？
用盒马小程序，不需要出门，就能买到新鲜的食材。有盒马购新鲜😜
<br>
盒马app刚出现，就吸足了眼球。最近看了看盒马界面，很Q，就想着仿照app写个小程序。
## 功能介绍
好奇微信小程序是如何制作的，也对盒马app感兴趣，就尝试写了这个盒马小程序。实现了app的部分功能，还有部分功能未实现，和大家一起学习😊
文章末有GitHub源项目代码地址
### 已实现的功能
- 购物车的操作。添加商品、删除商品
- 新增收货地址
- 点击二维码图片能扫一扫
- 图片轮播效果
- 滚动视图展示商品详情
## 项目效果图
### 页面简介
![Alt text](https://github.com/TeanLee/hema/blob/master/assets/gif/%E7%95%8C%E9%9D%A2%E7%AE%80%E4%BB%8B.gif)
### 购物车的操作
![Alt text](https://github.com/TeanLee/hema/blob/master/assets/gif/%E6%B7%BB%E5%8A%A0%E8%B4%AD%E7%89%A9%E8%BD%A6.gif)
### 添加收货地址
![Alt text](https://github.com/TeanLee/hema/blob/master/assets/gif/%E6%B7%BB%E5%8A%A0%E5%9C%B0%E5%9D%80.gif)
## 部分功能点实现介绍
### 将商品加入购物车
我使用easymock构建了一些数据，用于商品在列表展示。
这是wxml，用于商品的展示。
```
<scroll-view scroll-y>
    <block wx:for="{{goods}}" wx:key="index" wx:for-index="index">
        <view class="weui-cells">
            <view class="weui-cell">
                <view class="weui-cell__hd">
                    <image src="{{item.image}}" />
                </view>
                <view class="weui-cell__bd">
                    <view class="goodsList__bd__intro">{{item.name}}</view>
                    <view class="view__bd__price">
                        <text class="price left">￥{{item.price}}/{{item.unit}}</text>
                        <text class="add right" bindtap="addInCart" id="{{index}}">+</text>
                    </view>
                </view>
            </view>
        </view>
    </block>
</scroll-view>
```
在执行for循环遍历数据内容的时候，为每一个商品添加了index，用于确定用户将哪一件商品加入了购物车。给加号添加了一个绑定事件，用户点击加号，能将该商品放入购物车列表。
js部分代码：
这里最重要的是在app.js中添加了一个全局变量cardList，用于存储用户加入购物车的商品。这样，就能实现多个页面都能对购物车列表的数据进行操作了。
```
globalData: {
  cardList: []
}
```
商品展示界面：页面开始加载的时候，就请求数据，用于商品列表的显示。
```
wx.request({
  url: "https://www.easy-mock.com/mock/5a223b51707056548f086d8b/hema/getGoods",
  success: (res) => {
    console.log(res.data.data.goods);
    this.setData({
      goods: res.data.data.goods
    })
  }
})
```
用户将商品加入购物车执行的操作
```
addInCart: function(e) {
  const good = this.data.goods[e.currentTarget.id]; // 根据index，判断用户点击了哪个商品加入购物车
  const cart = app.globalData.cardList; // 获取购物车列表
  cart.push(good); // 用户选择商品加入购物车后，将该商品加入购物车列表
},
```
### 调整商品的购买数量
将商品加入购物车后，还有可能对添加的商品进行加减，调整购买数量。
购物车wxml界面：
```
<block wx:for="{{goodsList}}" wx:key="index" data-index="index">
    <view class="weui-cell">
        <view class="weui-cell__hd">
            <icon type="success" color="#23a3ff"></icon>
        </view>
        <view class="weui-cell__bd">
            <image src="{{item.image}}" />
        </view>
        <view class="weui-cell__ft right">
            <text class="proIntr left">{{item.name}}</text>
            <text class="price left">￥{{item.price}}/{{item.unit}}</text>
            <view class="count">
                <text class="reduce left" bindtap="reduceCount" id="{{index}}">-</text>
                <text class="number left">{{item.count}}</text>
                <text class="add left" bindtap="addCount" id="{{index}}">+</text>
            </view>
        </view>
    </view>
</block>
```
给加号减号分别添加了点击事件，循环时还要用index标出用户对购物车的哪一件商品进行了加减操作。
js部分：
```
onLoad: function (options) {
  this.setData({
    // 页面加载时就给购物车显示商品数量
    goodsList: app.globalData.cardList
  });
  this.sumMoney();
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
```
这个界面，我不确定获得的数据是什么，就反复测试了多次。
### 新增默认收货地址
在输入地址的界面，为每一个输入框都添加了监听输入的事件，用于监听用户输入的内容。
例如：
```
<view class="weui-cell">
    <view class="weui-cell__hd">
        <text class="weui-label mr60">收货地址</text>
    </view>
    <view class="weui-cell__bd">
        // 绑定的监听输入框事件 bindinput="getAddress"
        <input bindinput="getAddress" class="weui-input" placeholder="请输入收货地址" />
    </view>
</view>
```
我将获得的用户输入的默认地址存储到了storage中。
【划重点：微信小程序的storage存储大小是由限制的，不能将大量数据放在storage中】
js部分：
```
// 页面的初始数据，用户输入的收货地址、门牌号、姓名、联系电话
data: {
address: '',
num: '',
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
```
用户默认收货地址的显示，就从storage中按照key-value的方式取出用户存在storage中的地址信息。
js部分：
```
onShow: function () {
  var that = this;
  wx.getStorage({
    key: "name",
    success: function(res) {
      console.log(res);
      if(res.data.length > 0) {
        that.setData({
          address: res.data[0].address,
          num: res.data[1].num,
          name: res.data[2].name,
          phone: res.data[3].phone
        })
      }
    }
  })
```
### 图片轮播和滚动视图部分
图片轮播
给swiper组件添加current='{{activeIndex}}'就能判断当前展示图片的下标，再根据下标该表小圆点的展示状态（给相应的小圆点一个active类，有不同的样式）。小圆点也绑定了点击事件，能根据用户点击不同的小圆点，动态改变图片的展示状态。
```
<swiper class="page__bd__scroll" current='{{activeIndex}}' bindchange='swiperTab'>
  <swiper-item>
    <image class="page__scroll__item" src=""/>
  </swiper-item>
  <swiper-item>
    <image class="page__scroll__item" src=""/>
  </swiper-item>
  <swiper-item>
    <image class="page__scroll__item" src=""/>
  </swiper-item>
  <swiper-item>
    <image class="page__scroll__item" src=""/>
  </swiper-item>
  <swiper-item>
    <image class="page__scroll__item" src=""/>
  </swiper-item>
</swiper>

<ul class="page__scroll__btns">
  <li class="page__scroll__btn {{activeIndex==0?'active':''}}" bindtap="changeTag" data-index="0"></li>
  <li class="page__scroll__btn {{activeIndex==1?'active':''}}" bindtap="changeTag" data-index="1"></li>
  <li class="page__scroll__btn {{activeIndex==2?'active':''}}" bindtap="changeTag" data-index="2"></li>
  <li class="page__scroll__btn {{activeIndex==3?'active':''}}" bindtap="changeTag" data-index="3"></li>
  <li class="page__scroll__btn {{activeIndex==4?'active':''}}" bindtap="changeTag" data-index="4"></li>
</ul>
```
js部分：
```
// activeIndex 是当前播放图片的下标
data: {
  activeIndex: 0
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
```
## 遇到的问题
1、在写静态界面的时候，给子元素一个margin值，一直会影响父元素的margin值，纠结了好久才知道这个问题可以用bfc的知识解决。给父元素添加一个overflow: hidden，通过这种方法创建一个bfc，就能避免子元素的margin样式影响到父元素。
2、从后台或者从其他地方获取数据时，很难一眼看出来传值的内容是什么，我就把数据输出到控制台，一点点判断。
3、异步问题。js是异步执行的。比如执行到取数据的时候，程序不会等着取到数据再执行下一步，而是立即执行下一步。这点在输出数据和设置数据时要尤为注意。
## 收获
写完这些还是收获满满的。
感触最大的就是要善于查文档。微信的weui提供了很多样式，只要引入样式库，照着使用文档写，能少很多事。还有就是微信小程序的api，里面有很多微信小程序自带的api，很方便。
面对bug心理承受也更大了。学会了一些调试技巧。使用easymock构建模拟数据。
对底层的盒子模型、异步等东西有了更深一层的理解。

项目地址：https://github.com/TeanLee/hema
***如果觉得还不错的话，给个小星星start鼓励一下哦***
***比心***
### 联系方式：
如果有建议，欢迎联系我，一起学习。
wechat: ltt598625763
email: 598625763@qq.com
