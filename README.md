# openlayers 扩展 zoomSlider控件

[![Build Status](https://www.travis-ci.org/aurorafe/ol-control-bZoomSlider.svg?branch=master)](https://www.travis-ci.org/aurorafe/ol-control-bZoomSlider)
[![NPM](https://nodei.co/npm/ol-control-bzoomslider.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ol-control-bzoomslider/)

> 提供地图滑动缩放和平移，支持openlayers3+ 以上。

## build

> 重要: Github 仓库的 /dist 文件夹只有在新版本发布时才会更新。如果想要使用 Github 上最新的源码，你需要自己构建。

---

```bash
git clone https://github.com/aurorafe/ol-control-bZoomSlider.git
npm install
npm run dev
npm run build
```

## Use

> `new ol.control.BZoomSlider(options)` or `new olControlBZoomSlider(options)`

### CDN

```bash
https://unpkg.com/ol-control-loading@1.1.0/dist/ol-control-BZoomSlider.min.js
https://unpkg.com/ol-control-loading@1.1.0/dist/ol-control-BZoomSlider.js
https://unpkg.com/ol-control-loading@1.1.0/dist/ol-control-BZoomSlider.css
https://unpkg.com/ol-control-loading@1.1.0/dist/ol-control-BZoomSlider.min.css
```

### NPM

```bash
npm install ol-control-bzoomslider --save
import 'ol-control-bzoomslider'
new ol.control.BZoomSlider()

// or

import olControlBZoomSlider from 'ol-control-loading'
new olControlBZoomSlider()
```

## Examples

![demo](https://raw.githubusercontent.com/aurorafe/ol-control-bZoomSlider/master/asset/demo.gif)

其他示例请参看example文件夹


#### Parameters:

| key | type | desc |
| :--- | :--- | :---------- |
| `className` | `String` | 插件dom类名，默认值为 ``hmap-zoom-slider`` |
| `duration` | `Number` | 动画过渡时间 ，默认 ``200``|
| `pixelDelta` | `Number` | 平移的像素距离，默认 ``128`` |
| `render` | `Function` | 渲染函数 |
| `target` | `String` | 目标dom |

#### Extends

> `ol.control.Control`

##### `setMap(map)`

> 设置当前地图实例

###### Parameters:

| key | type | desc |
| :--- | :--- | :---------- |
| `map` | `ol.Map` | 地图实例 |
