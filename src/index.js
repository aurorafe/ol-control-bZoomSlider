/**
 * Created by FDD on 2017/7/28.
 * @desc 定制缩放控制条(仿百度)
 */
import './scss/zoomSlider.scss'
import {css} from './dom'
import * as htmlUtils from 'nature-dom-util/src/domUtils'
import * as Events from 'nature-dom-util/src/Events'
ol.control.BZoomSlider = function (params) {
  this.options = params || {}

  /**
   * 当前分辨率
   * @type {undefined}
   * @private
   */
  this.currentResolution_ = undefined

  /**
   * 滑块默认方向（默认竖向）
   * @type {number}
   * @private
   */
  this.direction_ = ol.control.BZoomSlider.Direction_.VERTICAL

  /**
   * 是否正在拖拽
   * @type {boolean}
   * @private
   */
  this.dragging_ = false

  /**
   * 高度限制
   * @type {number}
   * @private
   */
  this.heightLimit_ = 0

  /**
   * 宽度限制
   * @type {number}
   * @private
   */
  this.widthLimit_ = 0

  /**
   * 原始X
   * @type {null}
   * @private
   */
  this.previousX_ = null

  /**
   * 原始Y
   * @type {null}
   * @private
   */
  this.previousY_ = null

  /**
   * 计算出的视图大小（边框加边距）
   * @type {null}
   * @private
   */
  this.thumbSize_ = null

  /**
   * 滑块是否被初始化
   * @type {boolean}
   * @private
   */
  this.sliderInitialized_ = false

  /**
   * 动画过渡时延
   * @type {number}
   * @private
   */
  this.duration_ = this.options['duration'] !== undefined ? this.options['duration'] : 200

  let className = (this.options.className !== undefined ? this.options.className : 'hmap-zoom-slider')
  /**
   * @private
   * @type {Element}
   */
  this.element = htmlUtils.create('div', (className + ' ' + css.CLASS_UNSELECTABLE))

  let translateContent = htmlUtils.create('div', ('hmap-zoom-slider-translate-content' + ' ' + css.CLASS_SELECTABLE), this.element)

  let silderContent = htmlUtils.create('div', ('hmap-zoom-slider-content' + ' ' + css.CLASS_SELECTABLE), this.element)

  let translateN = htmlUtils.create('div', ('hmap-zoom-slider-button hmap-zoom-slider-translate-n' + ' ' + css.CLASS_SELECTABLE), translateContent)
  translateN.setAttribute('title', '向上平移')
  Events.listen(translateN, Events.eventType.CLICK,
    ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateN'))
  let translateS = htmlUtils.create('div', ('hmap-zoom-slider-button hmap-zoom-slider-translate-s' + ' ' + css.CLASS_SELECTABLE), translateContent)
  translateS.setAttribute('title', '向下平移')
  Events.listen(translateS, Events.eventType.CLICK,
    ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateS'))
  let translateW = htmlUtils.create('div', ('hmap-zoom-slider-button hmap-zoom-slider-translate-w' + ' ' + css.CLASS_SELECTABLE), translateContent)
  translateW.setAttribute('title', '向左平移')
  Events.listen(translateW, Events.eventType.CLICK,
    ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateW'))
  let translateE = htmlUtils.create('div', ('hmap-zoom-slider-button hmap-zoom-slider-translate-e' + ' ' + css.CLASS_SELECTABLE), translateContent)
  translateE.setAttribute('title', '向右平移')
  Events.listen(translateE, Events.eventType.CLICK,
    ol.control.BZoomSlider.prototype.handletranslateClick_.bind(this, 'translateE'))
  let zoomIn = htmlUtils.create('div', ('hmap-zoom-slider-zoom-in' + ' ' + css.CLASS_SELECTABLE), silderContent)
  zoomIn.setAttribute('title', '放大')
  Events.listen(zoomIn, Events.eventType.CLICK,
    ol.control.BZoomSlider.prototype.handleZoomClick_.bind(this, 1))

  let zoomOut = htmlUtils.create('div', ('hmap-zoom-slider-zoom-out' + ' ' + css.CLASS_SELECTABLE), silderContent)
  zoomOut.setAttribute('title', '缩小')
  Events.listen(zoomOut, Events.eventType.CLICK,
    ol.control.BZoomSlider.prototype.handleZoomClick_.bind(this, -1))

  let slider = htmlUtils.create('div', ('hmap-zoom-slider-zoom-slider' + ' ' + css.CLASS_SELECTABLE), silderContent)
  htmlUtils.create('div', ('slider-background-top' + ' ' + css.CLASS_SELECTABLE), slider)
  htmlUtils.create('div', ('slider-background-bottom' + ' ' + css.CLASS_SELECTABLE), slider)
  let sliderBackgroundMask = htmlUtils.create('div', ('slider-background-mask' + ' ' + css.CLASS_SELECTABLE), slider)
  sliderBackgroundMask.setAttribute('title', '缩放到此级别')
  let sliderBar = htmlUtils.create('div', ('slider-bar' + ' ' + css.CLASS_SELECTABLE), slider)
  sliderBar.setAttribute('title', '滑动缩放地图')

  /**
   * @type {ol.pointer.PointerEventHandler}
   * @private
   */
  // this.dragger_ = new ol.pointer.PointerEventHandler(slider)
  //
  // Events.listen(this.dragger_, ol.pointer.EventType.POINTERDOWN, this.handleDraggerStart_, this)
  // Events.listen(this.dragger_, ol.pointer.EventType.POINTERMOVE, this.handleDraggerDrag_, this)
  // Events.listen(this.dragger_, ol.pointer.EventType.POINTERUP, this.handleDraggerEnd_, this)
  Events.listen(slider, Events.eventType.CLICK, this.handleContainerClick_, this)
  Events.listen(sliderBackgroundMask, Events.eventType.CLICK, function (event) {
    event.stopPropagation()
  })
  let render = this.options['render'] ? this.options['render'] : ol.control.BZoomSlider.render
  ol.control.Control.call(this, {
    element: this.element,
    render: render,
    target: this.options['target']
  })
}

ol.inherits(ol.control.BZoomSlider, ol.control.Control)

/**
 * 处理缩放点击
 * @param delta
 * @param event
 * @private
 */
ol.control.BZoomSlider.prototype.handleZoomClick_ = function (delta, event) {
  event.preventDefault()
  this.zoomByDelta_(delta)
}

/**
 * 处理平移点击事件
 * @param type
 * @param event
 * @private
 */
ol.control.BZoomSlider.prototype.handletranslateClick_ = function (type, event) {
  event.preventDefault()
  console.log(type)
}

/**
 * @param {number} delta Zoom delta.
 * @private
 */
ol.control.BZoomSlider.prototype.zoomByDelta_ = function (delta) {
  let view = this.getMap().getView()
  if (view && view instanceof ol.View) {
    let currentResolution = view.getResolution()
    if (currentResolution) {
      let newResolution = view.constrainResolution(currentResolution, delta)
      if (this.duration_ > 0) {
        if (view.getAnimating()) {
          view.cancelAnimations()
        }
        view.animate({
          resolution: newResolution,
          duration: this.duration_,
          easing: ol.easing.easeOut
        })
      } else {
        view.setResolution(newResolution)
      }
    }
  }
}

/**
 * 更新控制条element
 * @param {ol.MapEvent} mapEvent Map event.
 * @this {ol.control.BZoomSlider}
 * @api
 */
ol.control.BZoomSlider.render = function (mapEvent) {
  if (!mapEvent.frameState) {
    return
  }
  if (!this.sliderInitialized_) {
    this.initSlider_()
  }
  let res = mapEvent.frameState.viewState.resolution
  if (res !== this.currentResolution_) {
    this.currentResolution_ = res
    this.setThumbPosition_(res)
  }
}

/**
 * 允许的方向值
 * @type {{VERTICAL: number, HORIZONTAL: number}}
 * @private
 */
ol.control.BZoomSlider.Direction_ = {
  VERTICAL: 0,
  HORIZONTAL: 1
}

/**
 * 设置地图
 * @param map
 */
ol.control.BZoomSlider.prototype.setMap = function (map) {
  if (map && map instanceof ol.Map) {
    ol.control.Control.prototype.setMap.call(this, map)
    if (map) {
      map.render()
    }
  } else {
    throw Error('传入的不是地图对象！')
  }
}

/**
 * @inheritDoc
 */
ol.control.BZoomSlider.prototype.disposeInternal = function () {
  this.dragger_.dispose()
  ol.control.Control.prototype.disposeInternal.call(this)
}

/**
 * 初始化滑块元素
 * @private
 */
ol.control.BZoomSlider.prototype.initSlider_ = function () {
  let container = this.element
  let containerSize = {
    width: container.offsetWidth, height: container.offsetHeight
  }
  let thumb = container.firstElementChild
  let computedStyle = getComputedStyle(thumb)
  let thumbWidth = thumb.offsetWidth +
    parseFloat(computedStyle['marginRight']) +
    parseFloat(computedStyle['marginLeft'])
  let thumbHeight = thumb.offsetHeight +
    parseFloat(computedStyle['marginTop']) +
    parseFloat(computedStyle['marginBottom'])
  this.thumbSize_ = [thumbWidth, thumbHeight]
  if (containerSize.width > containerSize.height) {
    this.direction_ = ol.control.BZoomSlider.Direction_.HORIZONTAL
    this.widthLimit_ = containerSize.width - thumbWidth
  } else {
    this.direction_ = ol.control.BZoomSlider.Direction_.VERTICAL
    this.heightLimit_ = containerSize.height - thumbHeight
  }
  this.sliderInitialized_ = true
}

/**
 * 容器点击事件处理
 * @param event
 * @private
 */
ol.control.BZoomSlider.prototype.handleContainerClick_ = function (event) {
  let view = this.getMap().getView()
  let relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2)
  let resolution = this.getResolutionForPosition_(relativePosition)
  view.animate({
    resolution: view.constrainResolution(resolution),
    duration: this.duration_,
    easing: ol.easing.easeOut
  })
}

/**
 * 处理拖拽
 * @param event
 * @private
 */
ol.control.BZoomSlider.prototype.handleDraggerStart_ = function (event) {
  if (!this.dragging_ && event.originalEvent.target === this.element.firstElementChild) {
    this.getMap().getView().setHint(ol.ViewHint.INTERACTING, 1)
    this.previousX_ = event.clientX
    this.previousY_ = event.clientY
    this.dragging_ = true
  }
}

/**
 * 处理拖动事件
 * @param event
 * @private
 */
ol.control.BZoomSlider.prototype.handleDraggerDrag_ = function (event) {
  if (this.dragging_) {
    let element = this.element.firstElementChild
    let deltaX = event.clientX - this.previousX_ + parseInt(element.style.left, 10)
    let deltaY = event.clientY - this.previousY_ + parseInt(element.style.top, 10)
    let relativePosition = this.getRelativePosition_(deltaX, deltaY)
    this.currentResolution_ = this.getResolutionForPosition_(relativePosition)
    this.getMap().getView().setResolution(this.currentResolution_)
    this.setThumbPosition_(this.currentResolution_)
    this.previousX_ = event.clientX
    this.previousY_ = event.clientY
  }
}

/**
 * 处理拖拽结束事件
 * @param event
 * @private
 */
ol.control.BZoomSlider.prototype.handleDraggerEnd_ = function (event) {
  if (this.dragging_) {
    let view = this.getMap().getView()
    view.setHint(ol.ViewHint.INTERACTING, -1)
    view.animate({
      resolution: view.constrainResolution(this.currentResolution_),
      duration: this.duration_,
      easing: ol.easing.easeOut
    })
    this.dragging_ = false
    this.previousX_ = undefined
    this.previousY_ = undefined
  }
}

/**
 * 计算指针位置（相对于父容器）
 * @param res
 * @private
 */
ol.control.BZoomSlider.prototype.setThumbPosition_ = function (res) {
  let position = this.getPositionForResolution_(res)
  let thumb = this.element.firstElementChild
  if (this.direction_ === ol.control.BZoomSlider.Direction_.HORIZONTAL) {
    thumb.style.left = this.widthLimit_ * position + 'px'
  } else {
    thumb.style.top = this.heightLimit_ * position + 'px'
  }
}

/**
 * 给出x和y偏移量的指针的相对位置
 * @param x
 * @param y
 * @returns {number}
 * @private
 */
ol.control.BZoomSlider.prototype.getRelativePosition_ = function (x, y) {
  let amount
  if (this.direction_ === ol.control.BZoomSlider.Direction_.HORIZONTAL) {
    amount = x / this.widthLimit_
  } else {
    amount = y / this.heightLimit_
  }
  return ol.math.clamp(amount, 0, 1)
}

/**
 * 计算相关分辨率
 * @param position
 * @returns {number}
 * @private
 */
ol.control.BZoomSlider.prototype.getResolutionForPosition_ = function (position) {
  let view = this.getMap().getView()
  if (view && view instanceof ol.View) {
    return this.getResolutionForValueFunction(1 - position)
  }
}

/**
 * 获取值
 * @param optPower
 */
ol.control.BZoomSlider.prototype.getValueForResolutionFunction = function (optPower) {
  let power = optPower || 2
  let view = this.getMap().getView()
  let maxResolution = view.getMaxResolution()
  let minResolution = view.getMinResolution()
  let max = Math.log(maxResolution / minResolution) / Math.log(power)
  return (function (resolution) {
    let value = (Math.log(maxResolution / resolution) / Math.log(power)) / max
    return value
  })()
}

/**
 * 获取分辨率
 * @param optPower
 */
ol.control.BZoomSlider.prototype.getResolutionForValueFunction = function (optPower) {
  let power = optPower || 2
  let view = this.getMap().getView()
  let maxResolution = view.getMaxResolution()
  let minResolution = view.getMinResolution()
  let max = Math.log(maxResolution / minResolution) / Math.log(power)
  return (function (value) {
    let resolution = maxResolution / Math.pow(power, value * max)
    return resolution
  })()
}

/**
 * 计算相关位置
 * @param res
 * @returns {number}
 * @private
 */
ol.control.BZoomSlider.prototype.getPositionForResolution_ = function (res) {
  let view = this.getMap().getView()
  if (view && view instanceof ol.View) {
    return (1 - this.getValueForResolutionFunction(res))
  }
}
