# openlayers 扩展 Loading

> 提供地图图层加载时的loading层和事件，支持openlayers3+ 以上。

> 基于eblondel的ol3-loadingpanel修改，原有扩展已不能使用。 [原地址](https://github.com/eblondel/ol3-loadingpanel)

[![Build Status](https://www.travis-ci.org/aurorafe/ol-control-loading.svg?branch=master)](https://www.travis-ci.org/aurorafe/ol-control-loading)
[![NPM](https://nodei.co/npm/aurorafe/ol-control-loading.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/aurorafe/ol-control-loading/)

## build

> 重要: Github 仓库的 /dist 文件夹只有在新版本发布时才会更新。如果想要使用 Github 上最新的源码，你需要自己构建。

---

```bash
git clone https://github.com/aurorafe/ol-control-loading.git
npm install
npm run dev
npm run build
```

## Use

> `new ol.control.Loading(options)`

### CDN

```bash
https://unpkg.com/ol-control-loading@1.0.0/dist/ol-control-loading.min.js
https://unpkg.com/ol-control-loading@1.0.0/dist/ol-control-loading.js
https://unpkg.com/ol-control-loading@1.0.0/dist/static/css/ol-control-loading.css
https://unpkg.com/ol-control-loading@1.0.0/dist/static/css/ol-control-loading.min.css
```

### NPM

```bash
npm install ol-control-loading --save
import 'ol-control-loading'
```

## Examples

![animatedGif](https://raw.githubusercontent.com/aurorafe/ol-control-loading/master/asset/animatedGif.gif)

![progressBar](https://raw.githubusercontent.com/aurorafe/ol-control-loading/master/asset/progressBar.gif)

其他示例请参看example文件夹

#### Parameters:

| key | type | desc |
| :--- | :--- | :---------- |
| `className` | `String` | 插件dom类名，默认值为 ``hmap-loading-panel`` |
| `widget` | `String` | loading类型: ``animatedGif`` 或者 ``progressBar`` （默认值）|
| `progressMode` | `String` | mode to use for reporting progress: ``tile`` (default) or ``layer``|
| `showPanel` | `Boolean` | loading面板是否显示，默认为 ``true``. 不想使用默认时，可以通过事件自定义loading |
| `onStart` | `Object` | 监听开始事件 |
| `onProgress` | `Object` | 加载进度 |
| `onEnd` | `Object` | 某次图层加载完成事件 |

#### Extends

> `ol.control.Control`

#### Methods

##### `show()`

> 显示loading

##### `hide()`

> 隐藏loading

##### `progressDetails()`

> 返回当前进度详情， [loaded,toload] values.

##### `progress()`

> 返回一个0到1的进度

##### `setMap(map)`

> 设置当前地图实例

###### Parameters:

| key | type | desc |
| :--- | :--- | :---------- |
| `map` | `ol.Map` | 地图实例 |
