前段时间，随着马化腾现身全国多地用微信小程序乘坐公交的新闻出现，微信小程序的热度可谓是更上了一层。微信小程序现身至今，因其不用下载就可使用的方便等优点，发展趋势一直良好。

盒马鲜生的问世也是充满了热度，实现了快速配送，可谓是阿里巴巴对线下超市完全重构的新零售业态。

两个都这么方便的东西碰撞到一起，会发生什么呢？

最近正好在学习微信小程序，于是照着盒马鲜生APP改编了一个微信小程序。

文末有GitHub源码地址，之后我也会不断更新完善这个小程序。如果你也对这个微信小程序感兴趣，欢迎交流，共同学习。
## 功能简介
本着便利的理念，实现了商城类APP的主要功能。
 - 用户能够根据点击不同的商品分类，跳转页面看到各种商品的列表。
 - 点击商品可以加入购物车，在购物车中还能实现对商品的增加或者减少数量、全选反选商品、删除购物车商品等操作。
 - 首页中，点击左上角的按钮能够添加默认收货地址。
 - 点击右上角的扫一扫标志，还能扫描二维码（下面的gif介绍是模拟器的效果，只能打开电脑中的图片进行扫描，真机可以打开相机进行扫描）。
 - 首页中最顶上实现了图片轮播及自动切换，底部实现了滚动视图，能够横着滑动展示商品信息。
我们先来看看效果图，稍后再仔细介绍每一点的实现方式。
### 页面简介
这里主要介绍了该小程序的主要界面信息、展示了几个页面跳转及商品列表信息。请关注首页上方的图片轮播及底部的横向滚动视图。

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d14cffa1e83?w=286&h=504&f=gif&s=2188369)
### 关于购物车的操作
将商品加入购物车。

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d1bc8d35d45?w=286&h=504&f=gif&s=1608570)

对购物车中商品的数量进行增加或者减少。

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d20ffe9886a?w=286&h=504&f=gif&s=257306)

对购物车的商品进行全选或反选。

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d25711a1131?w=286&h=504&f=gif&s=336845)

删除购物车内商品。

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d28395edd2d?w=286&h=504&f=gif&s=150802)

### 增加默认收货地址、二维码扫一扫
新增收货地址。

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d2b6f21f3fe?w=286&h=504&f=gif&s=264719)

二维码扫一扫（这里是模拟机测试的，只能添加本地图片进行扫描，真机可以打开相机扫一扫）

![](https://user-gold-cdn.xitu.io/2017/12/15/16057d2e7caff4d8?w=286&h=504&f=gif&s=303875)

<br>
接下来就是实现方式的介绍。

## 功能实现详解

### 首页图片轮播和底部的滚动视图

微信小程序自带组件 滑块视图容器swiper，能够实现滑块视图，每一个视图都放在一个swiper-item中。设置参数auto:play就可以自动播放导致swiper变化。

```
<swiper class="page__bd__scroll" current='{{activeIndex}}' bindchange='swiperTab' autoplay="true" interval="2000" duration="1000">
  // interval是自动切换时间间隔，duration是滑动动画时长
  // 每一个swiper-item就是一个视图
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
```

横向滚动视图的实现：

微信自带组件 可滚动视图区域scroll-view，通过设置属性名scroll-x或者scroll-y可以实现视图的横向滚动或者纵向滚动。
```
// 属性名scroll-x定义了该视图允许横向滚动
<scroll-view scroll-x class="scrollx-section__content">
  // 利用循环从后台获取数据，在视图中有多个view，也就是在页面中能看到的多个商品展示。
  <block wx:for="{{scrollXList}}" wx:key="index" wx:for-index="index">
    <view class="scrollx-section__content__item">
      <view class="scrollx-section__item__wrapper">
        <view class="view__wrapper__image">
            <image src="https://user-gold-cdn.xitu.io/2017/12/15/16057cf8f3865280" />
        </view>
        <view class="view__wrapper__intro">
          <view class="wrapper__intro__title">
            <text>{{item.name}}</text>
            <text>{{item.secName}}</text>
          </view>
          <view class="wrapper__intro__content left">
            <text>{{item.leftTitle}}</text>
            <text>{{item.leftSecTitle}}</text>
          </view>
          <view class="wrapper__intro__content right">
              <text>{{item.rightTitle}}</text>
              <text>{{item.rightSecTitle}}</text>
          </view>
          <view class="wrapper__intro__price">
            <a>￥{{item.price}}</a><a>/{{item.unit}}</a><a id="{{index}}" bindtap="addInCart">+</a>
          </view>
        </view>
      </view>
    </view>
  </block>
</scroll-view>
```
### 关于购物车的操作
#### 将商品加入购物车
在不同的页面根据分类信息能够跳转到不同的页面进入商品列表，比如能在首页和分类页，可以根据分类信息进入不同的商品列表，将商品加入购物车。要想在首页、商品分类界面、购物车多个界面都获取到购物车列表信息，单个页面的数据作用域只在本文件夹，要想多个页面共同操作同一个数据应该怎么做呢？

对于在多个页面进行传值的数据，我们可以在app.js中设置一个全局变量，再在每个页面都引入这个全局数据，就可以实现多个页面共用一个数据了。
```
// app.js中的全局变量
globalData: {
  cardList: [],
  goodsSortsChoice: null // 用来标记首页商品分类  用户点击了哪个分类，进而显示不一样的商品列表
}
```
这里我设置了两个全局变量。cardList是购物车数据，用户点击商品加入购物车，就能将商品加入该数组。goodsSortsChoice是一个标记。在首页和分类界面都有不同的分类介绍，该标记能记住用户在分类界面点击了哪一个分类，然后根据这个用户的点击，跳转至商品展示界面，展示不同的信息。

在商品列表界面，为每一件商品的加入购物车选项都添加了一个点击事件addCount，同时，要判断用户点击了哪一件商品，就要为每一件商品加上一个index，这里我的做法是在循环输出后台的商品列表数据时，为每个循环动态绑定data-index="index"，再为每一个“+”设置一个id="{{index}}"，进行点击判断。
```
<block wx:for="{{goods}}" wx:key="index" wx:for-index="index">
    <view class="weui-cells">
        <view class="weui-cell">
            <view class="weui-cell__hd">
                <image src="https://user-gold-cdn.xitu.io/2017/12/15/16057cf8f3865280" />
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
```
js部分就是实现将商品加入购物车的方法addInCart。这里将商品加入购物车前要先遍历已有的购物车数组进行判断，如果商品已经在购物车中，就直接将购物车中的该商品数量加一，否则才直接将商品添加至全局的购物车数组。
```
addInCart: function(e) {
  const good = this.data.goods[e.currentTarget.id]; // 根据index，判断用户点击了哪个商品加入购物车
  const cart = app.globalData.cardList; // 获取购物车列表
  // 设置一个标记，判断用户想加入购物车的商品是否已经存在购物车了
  var flag = false;
  // some 是es6新增的方法，用于遍历整个数组，如果数组中存在一个及以上元素，就返回true
  flag = cart.some((item) => {
    return item === good;
  })
  console.log(flag);
  // 如果购物车中没有该元素，就将该商品加入购物车，否则就将该商品的购买数量加一
  if(!flag) {
    cart.push(good); // 用户选择商品加入购物车后，将该商品加入购物车列表
    wx.showToast({
      title: '商品已加入购物车',
      icon: 'success',
      duration: 2000
    })
  } else {
    // 商品已经存在购物车，直接将购买数量加一
    this.data.goods[e.currentTarget.id].count ++;
  }
},
```
wx.showToast是微信自带的API，能够在页面中出现一个弹窗。
#### 增加或减少购物车中商品的购买数量
增减商品购买数量的思想是，给加减号分别绑定两个点击事件 addCount 和 reduceCount，并且在循环输出购物车列表的商品时，为加减号添加index索引，用于判断用户点击了哪一件商品。
```
<block wx:for="{{goodsList}}" wx:key="index" data-index="index">
    <view class="weui-cell">
        <view class="weui-cell__hd">
            <icon id="{{index}}" bindtap="selectGoods" type="{{item.type}}" color="#23a3ff"></icon>
        </view>
        <view class="weui-cell__bd">
            <image src="https://user-gold-cdn.xitu.io/2017/12/15/16057cf8f3865280" />
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
js部分：
```
// 增加商品数量
addCount:function (e) {
  var that = this;
  // 根据点击事件获取用户点击了哪一件商品
  const goodId = e.currentTarget.id;
  that.data.goodsList[goodId].count++;
  this.setData({
    goodsList: that.data.goodsList
  })
  // 每一次增减商品数量都要重新计算购物车总钱数
  this.sumMoney();
},
// 减少商品数量
reduceCount: function(e) {
  var that = this;
  const goodId = e.currentTarget.id;
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
  this.setData({
    goodsList: that.data.goodsList
  })
  // 每一次增减商品数量都要重新计算购物车总钱数
  this.sumMoney();
},
```
#### 购物车商品总价的计算
对于选中的商品，调用sumMoney()计算总价。该方法是遍历购物车中的商品，获得每件商品的单价和件数，进行相乘后相加。
```
// 计算所有商品的钱数
sumMoney: function() {
  // count用于记录每件商品的购买数量
  var count = 0;
  // goods是购物车中的商品，对其进行遍历，计算价格
  const goods = this.data.goodsList;
  for(let i = 0; i < goods.length; i++) {
    count += goods[i].count*goods[i].price;
  }
  this.setData({
    sum: count
  })
},
```
### 商品的全选和反选
选中的商品和未选中的商品，在列表中展示时，最重要的一个差别是商品列前是蓝色的小勾还是空心的圆点。

因此要先为购物车的商品设置一个状态，对界面的样式进行改变。对于这个状态值，是在加载购物车界面前就要有该状态，因此最先我想在后台数据中为每个商品添加一个状态值。但是这样做有很大的不足之处，对于这个状态值，只有购物车界面需要，对于其他界面来说是多余的，给后台多添加一个数据就意味着要更改所有后台商品数据，增大了实现的复杂度。后面我又想到了一个方法。在购物车界面加载前，先遍历一遍购物车，为每一件购物车添加一个属性type="success"（type参数设置的妙处：success 和 circle类名是微信组件icon的一个状态值，能显示小勾或空心圆点）。
购物车onload方法，遍历购物车中的商品，添加状态type：
```
onLoad: function (options) {
  const cardList = app.globalData.cardList;
  cardList.map(item => {
    item.type = "success";
  });
},
```
前台界面展示部分:
```
<icon id="{{index}}" bindtap="selectGoods" type="{{item.type}}" color="#23a3ff"></icon>
```
通过这种方式，就实现了动态改变商品状态的方法。
我们可以创建一个方法，遍历购物车中的商品，如果全选了，就吧全选的选项勾上。
```
// 用来判断是否全选
allSelected: function() {
  const goods = this.data.goodsList;
  // some是es6新增的方法，如果数组中至少有一个符合条件的，就会返回true
  var symbol = goods.some(good => {
    return good.type === "circle"
  })
  // 经过symbol标记，如果购物车中有未选中的商品，全选状态就是空心圆
  if(symbol) {
    this.data.allStatus = "circle"
  } else {
    // 如果购物车中所有商品都被选中了，全选状态就是一个勾
    this.data.allStatus = "success"
  }
  this.setData({
    allStatus: this.data.allStatus
  })
},
```
<br>
说回全选和反选操作。全选就是页面底部总计一栏，打上了勾为全选，首先给全选框设置一个点击事件。若当前为全选状态，点击后变成空心原点，反之亦然。

```
<view class="shopping__ft">
    <view class="shopping__ft__hd">
        <!-- 给全选按钮一个点击事件selOrUnsel -->
        <icon bindtap="selOrUnsel" type="{{allStatus}}" color="#23a3ff"></icon>
        全选
    </view>
    <view class="shopping__ft__bd">
        <text>合计：</text>
        <text>￥{{sum}}</text>
    </view>
    <view class="shopping__ft__ft" bindtap="sumMoney">
        去结算
    </view>
</view>
```
js实现：
```
selOrUnsel: function() {
  // 获得全选按钮和商品列表
  const status = this.data.allStatus;
  const goods = this.data.goodsList;
  // 点击按钮后查看当前全选框的状态，对其进行取反的改变，并且对商品进行全选或反选
  if(status === "success") {
    // 如果全选按钮之前是选中的，就变成空心圆
    this.data.allStatus = "circle";
    // 遍历商品列表的每一项进行设置状态属性未未选中
    goods.map(good => {
      good.type = "circle";
    })
  } else {
    this.data.allStatus = "success";
    // 如果点击之前未选中全选按钮，就进行全选。遍历购物车列表改变所有商品的状态值
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
```
#### 删除购物车中的商品
购物车界面右上角有一个删除，能够删除选定的商品。先给“删除”添加一个点击事件delGoods。：
```
<view class="shopping__hd">
    <view class="shopping__hd__content">
        <view class="shopping__title">
            购物车
            <a class="shopping__title__delete right" bindtap="delGoods">删除</a>
        </view>
    </view>
</view>
```
js实现 delGoods 方法,用一个数组存放已经选中的要删除的商品，再遍历要删除的商品数组，用 splice 方法逐个删除。
```
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
```
### 添加默认收货地址
在首页的左上角有个小点，点击能够添加默认的收货地址。

添加默认收货地址也需要在多个页面进行传值，因为显示默认地址和设置默认地址不在同一个界面。考虑到默认收货地址需要长期存储在用户的个人信息中，这次我们用到了 storage 进行数据的存储。

话不多说，要实现功能，绑定一个事件 chooseAddr 先。
```
<!-- 我现在是首页 -->
<view class="page__hd__input-left left">
  <image src="https://user-gold-cdn.xitu.io/2017/12/15/16057cf8f81b6d70" bindtap="chooseAddr" />
</view>
```
将页面跳转到默认收货地址展示界面，这里能显示输入的收货地址
```
chooseAddr: function() {
  wx.navigateTo({
    url: "../chooseAddress/chooseAddress"
  })
},
```
在显示默认收货地址的界面，右上角还有一个按钮，可以新增收货地址，那我们再跳转一遍页面到设置默认收货地址界面吧。
```
<!-- 我是显示默认收货地址的界面 -->
<view class="choose-addr__hd">
    <text class="choose-addr__title">选择收货地址</text>
    <text class="choose-addr__add right" bindtap="addNewAddr">新增地址</text>
</view>
```
```
// 我要跳转到设置默认收货地址界面啦
addNewAddr: function() {
  wx.navigateTo({
    url: "../newAddr/newAddr"
  })
},
```
在设置默认收货地址界面，给每个输入框分别设置输入改变事件bindinput，用于获得输入框的内容。
```
<view class="newAddr__bd">
    <view class="weui-cells weui-cells_form gray-input">
        <view class="weui-cell">
            <view class="weui-cell__hd">
                <text class="weui-label mr60">收货地址</text>
            </view>
            <view class="weui-cell__bd">
                <input bindinput="getAddress" class="weui-input" placeholder="请输入收货地址" />
            </view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__hd">
                <text class="weui-label mr94">门牌号</text>
            </view>
            <view class="weui-cell__bd">
                <input bindinput="getNum" class="weui-input" placeholder="门牌号" />
            </view>
        </view>
    </view>
    <view class="weui-cells weui-cells_form second-weui-cells">
        <view class="weui-cell">
            <view class="weui-cell__hd">
                <text class="weui-label mr48">联系人</text>
            </view>
            <view class="weui-cell__bd">
                <input bindinput="getName" class="weui-input" placeholder="联系人" />
            </view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__hd">
                <label class="weui-label mr44">手机号</label>
            </view>
            <view class="weui-cell__bd">
                <input bindinput="getPhone" class="weui-input" placeholder="请输入手机号" />
            </view>
        </view>
    </view>
</view>
```
输入改变事件获得输入框的内容：
```
data: {
  address: '',
  num: '',
  name: '',
  phone: ''
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
```
当当当！说了这么多，storage 存储数据的重点来啦！

wxml 界面，设置一个点击事件 saveInfo ，点击后进行数据的保存：
```
<view class="newAddr__hd">
    <text class="newAddr__add left" bindtap="backToChooseAddr">返回</text>
    <text class="newAddr__title">选择收货地址</text>
    <text bindtap="saveInfo" class="newAddr__add right">保存</text>
</view>
```
微信提供了一个API：wx.setStorage 能按照键（key）值（data）对的方式在缓存中存数据。

key 是 本地缓存中的指定的 key，data 是需要存储的内容，success 是接口调用成功的回调函数。
```
// 用户点击保存后，对输入的数据进行存储，并反馈存储状态
saveInfo: function() {
  wx.setStorage({
    key: "name",
    data: [{address:this.data.address}, {num: this.data.num}, {name: this.data.name}, {phone: this.data.phone}],
    success: function() {
      // 数据设置成功后，弹框提示用户信息保存完整，并跳回展示默认地址的界面
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
数据设置成功后，跳回展示默认地址的界面。在这里，我们要获取缓存中的数据。

微信提供了一个API：wx.getStorage 能从本地缓存中异步获取指定 key 对应的内容。key 是本地缓存中的指定的 key，success 是接口调用的回调函数。
```
onShow: function () {
  var that = this;
  wx.getStorage({
    key: "name",
    success: function(res) {
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
},
```
### 扫描二维码
在首页的右上角，有一个扫一扫的图片，点击后能扫描二维码。

给这张图片绑定一个点击事件scan:
```
<view class="page__hd__input-right left">
  <image bindtap="scan" src="https://user-gold-cdn.xitu.io/2017/12/15/16057cf8f3b9287a" />
</view>
```
调用微信自带的 API：wx.scanCode 就能扫描二维码啦。
```
scan: function() {
  wx.scanCode({
    success: (res) => {
      console.log(res)
    }
  })
},
```
## 后台数据
关于后台数据的来源，我使用的是用 [easymock](https://www.easy-mock.com/) 构建模拟数据。easymock 对于暂时只关注前台界面的程序员来说是真的超级好用。之前写过一篇文章[使用Easy Mock构建模拟数据](https://segmentfault.com/a/1190000011996034)欢迎移步查看。
## 写在最后
写微信小程序最重要的可能就是查看文档了。微信给开发人员提供了很详细的各种组件和API的介绍和使用方法。

附上[微信小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)

最后奉上GitHub源码地址：https://github.com/TeanLee/hema

如果觉得还不错的话，请给个start鼓励一下哟~
