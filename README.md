## 项目简介
该项目实现了商城类微信小程序的前端。

微信小程序后端仓库链接[：商城类微信小程序后端（仿盒马鲜生app）](https://github.com/TeanLee/mall-server)

实现的功能点：
- 商品
    - [ ] 首页商品分类展示
    - [ ] 首页商品滚动展示
    - [ ] 分类页商品按不同分类展示
    - [ ] 商品详情页（简要展示）
- 购物车
    - [ ] 将商品加入购物车
    - [ ] 购物车商品数量的修改
    - [ ] 删除购物车的商品
- 订单（我的 -> 所有订单）
    - [ ] 购物车页面下单（简易版本的实现，用户在购物车界面下单后，可在“待支付”中查看）
    - [ ] 用户订单查询

## 开发环境
-   **微信小程序开发者工具。官网：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html+**
-  (*注意：务必使用 小程序开发者工具 开发*)
- 安装过 yarn 或者 npm

## 运行方式
1.  `git clone https://github.com/TeanLee/hema.git`
1.  在微信开开发者工具中导入 clone 的项目
1.  在根目录下执行 `yarn`
1.  开发者工具执行构建 npm（左上角选 工具 -> 构建 npm）
1.  点击顶部功能栏的「编译」

### 技术选型

**前端技术**
| 技术 | 说明 | 官网 |
|  ----  | ----  | ----  |
| 微信小程序框架 | 小程序框架 | https://developers.weixin.qq.com/miniprogram/dev/framework/ |
| Axios | 前端HTTP框架 | <https://github.com/axios/axios> |
| WeUI | 微信原生视觉体验一致的基础样式库 | https://weui.io/ |
| Vant Weapp | UI 组件库 | https://youzan.github.io/vant-weapp/#/home |

## 项目组织结构
````
pages
├── index -- 项目首页
├── sort -- 分类页面
├── shopping -- 购物车页面
├── mine -- “我的”
├── goodsList -- 商品列表
├── waitPayList -- 订单列表页
````

## 运行结果展示（演示地址：https://juejin.cn/post/7044352698660945934
### 首页、分类页
实现了商品分类功能、商品列表页。

https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83c24657e31746c08b98de9a87b77a70~tplv-k3u1fbpfcp-watermark.awebp?

### 商品详情页和商品分类页
实现了简要的商品详情展示。在详情页面，有商品详情展示、将商品加入购物车、提供快速购买的功能、还能直接跳转至购物车。

https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2994e6f153f6464997ee26870bb8053e~tplv-k3u1fbpfcp-watermark.image?

### 购物车
实现加入购物车的商品展示，购物车商品的增、删、改的功能。简易实现了购物车下单的功能，在购物车选中点击下单的商品都会被标记为待付款的订单，可在「我的」-> 「待付款」页面查看。

https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/627a1e4b97af4dcab137736f6738854a~tplv-k3u1fbpfcp-watermark.image?

### 订单页面
实现了简易的商品购买、订单查询的功能。用户点击立即购买的商品会变成待支付的订单。在「我的」->「待付款」页面点击「立即付款」，则订单会变成“待配送”状态，可在「我的」->「待配送」页面查看支付后的订单。「我的」->「全部订单」可查看所有状态的订单。

https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25d89a7f412f412baba5423e93a6b8fa~tplv-k3u1fbpfcp-watermark.image?
