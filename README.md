## 项目简介
该项目实现了商城类微信小程序的前端。

微信小程序前端仓库链接[：商城类微信小程序后端（仿盒马鲜生app）](https://github.com/TeanLee/mall-server)

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