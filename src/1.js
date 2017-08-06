ol.control.HDZoomSlider = function (opt_options) {

  // var HDMap_panN = goog.dom.createDom(goog.dom.TagName.DIV,
  //   ["HDMap_button", "HDMap_panN", ol.css.CLASS_UNSELECTABLE]);
  // goog.dom.setProperties(HDMap_panN, {"title": "向上平移"});
  //
  // var HDMap_panW = goog.dom.createDom(goog.dom.TagName.DIV,
  //   ["HDMap_button", "HDMap_panW", ol.css.CLASS_UNSELECTABLE]);
  // goog.dom.setProperties(HDMap_panW, {"title": "向左平移"});
  //
  // var HDMap_panE = goog.dom.createDom(goog.dom.TagName.DIV,
  //   ["HDMap_button", "HDMap_panE", ol.css.CLASS_UNSELECTABLE]);
  // goog.dom.setProperties(HDMap_panE, {"title": "向右平移"});
  //
  // var HDMap_panS = goog.dom.createDom(goog.dom.TagName.DIV,
  //   ["HDMap_button", "HDMap_panS", ol.css.CLASS_UNSELECTABLE]);
  // goog.dom.setProperties(HDMap_panS, {"title": "向下平移"});
  //
  // this.HDMap_stdMpPan = goog.dom.createDom(goog.dom.TagName.DIV,
  //   ["HDMap_stdMpPan", ol.css.CLASS_UNSELECTABLE],
  //   [HDMap_panN, HDMap_panW, HDMap_panE, HDMap_panS]);
  //
  // goog.style.setStyle(this.HDMap_stdMpPan, {
  //   "background-position": "0px 0px"
  // });

  var HDMap_stdMpZoom = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_stdMpZoom"]);
  goog.style.setStyle(HDMap_stdMpZoom, {"height": "146px", "width": "32px"});

  // this.HDMap_stdMpZoomIn = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_button", "HDMap_stdMpZoomIn"]);
  // goog.style.setStyle(this.HDMap_stdMpZoomIn, {"background-position": "0px -221px"});
  // goog.dom.setProperties(this.HDMap_stdMpZoomIn, {"title": "放大一级"});
  // this.HDMap_stdMpZoomOut = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_button", "HDMap_stdMpZoomOut"]);
  // goog.style.setStyle(this.HDMap_stdMpZoomOut, {
  //   "top": "102px",
  //   "background-position": " 0px -265px"
  // });

  // goog.dom.setProperties(this.HDMap_stdMpZoomOut, {"title": "缩小一级"});
  // var HDMap_stdMpSlider = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_stdMpSlider"]);
  // goog.style.setStyle(HDMap_stdMpSlider, {"height": "108px"});

  // goog.dom.appendChild(HDMap_stdMpZoom, this.HDMap_stdMpZoomIn);
  // goog.dom.appendChild(HDMap_stdMpZoom, this.HDMap_stdMpZoomOut);
  // goog.dom.appendChild(HDMap_stdMpZoom, HDMap_stdMpSlider);


  // this.HDMap_stdMpSliderBgTop = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_stdMpSliderBgTop"]);
  // goog.style.setStyle(this.HDMap_stdMpSliderBgTop, {"height": "84px"});
  //
  // var HDMap_stdMpSliderBgBot = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_stdMpSliderBgBot"]);
  // goog.style.setStyle(HDMap_stdMpSliderBgBot, {"top": "66px", "height": "18px"});


  var HDMap_stdMpSliderMask = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_stdMpSliderMask"]);
  goog.dom.setProperties(HDMap_stdMpSliderMask, {"title": "缩放到此级别"});
  this.HDMap_stdMpSliderBar = goog.dom.createDom(goog.dom.TagName.DIV, ["HDMap_stdMpSliderBar"]);

  goog.dom.setProperties(this.HDMap_stdMpSliderBar, {"title": "拖动缩放"});

  goog.dom.appendChild(HDMap_stdMpSlider, this.HDMap_stdMpSliderBgTop);
  goog.dom.appendChild(HDMap_stdMpSlider, this.HDMap_stdMpSliderBgTop);
  goog.dom.appendChild(HDMap_stdMpSlider, HDMap_stdMpSliderMask);
  goog.dom.appendChild(HDMap_stdMpSlider, this.HDMap_stdMpSliderBar);


  this.HDMap_stdMpCtrl = goog.dom.createDom(goog.dom.TagName.DIV,
    ["HDMap_stdMpCtrl", ol.css.CLASS_UNSELECTABLE],
    [this.HDMap_stdMpPan, HDMap_stdMpZoom]);
  goog.style.setStyle(this.HDMap_stdMpCtrl, {
    "display": "none",
    "width": "42px",
    "height": "190px",
    "right": "auto",
    "left": "8px",
    "position": "absolute",
    "z-index": 100
  });

  var options = opt_options ? opt_options : {};

  /**
   * Will hold the current resolution of the view.
   *
   * @type {number|undefined}
   * @private
   */
  this.currentResolution_ = undefined;

  /**
   * The direction of the slider. Will be determined from actual display of the
   * container and defaults to ol.control.HDZoomSlider.direction.VERTICAL.
   *
   * @type {ol.control.HDZoomSlider.direction}
   * @private
   */
  this.direction_ = ol.control.HDZoomSlider.direction.VERTICAL;

  /**
   * The calculated thumb size (border box plus margins).  Set when initSlider_
   * is called.
   * @type {ol.Size}
   * @private
   */
  this.thumbSize_ = null;

  /**
   * Whether the slider is initialized.
   * @type {boolean}
   * @private
   */
  this.sliderInitialized_ = false;

  /**
   * @private
   * @type {number}
   */
  this.duration_ = options.duration ? options.duration : 200;

  var className = options.className ? options.className : 'ol-HDZoomSlider';

  var containerElement = goog.dom.createDom(goog.dom.TagName.DIV,
    [className, ol.css.CLASS_UNSELECTABLE],
    this.HDMap_stdMpCtrl);

  var render = options.render ? options.render : ol.control.HDZoomSlider.render;

  goog.base(this, {
    element: containerElement,
    render: render
  });
};
goog.inherits(ol.control.HDZoomSlider, ol.control.Control);

/**
 * Update the HDZoomSlider element.
 * @param {goog.events.BrowserEvent} event Map event.
 */
ol.control.HDZoomSlider.prototype.mouseenter = function (event) {
  var target = event.target;
  var title = target.getAttribute("title");
  switch (title) {
    case "向上平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -44px");
      break;
    case "向下平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -132px");
      break;
    case "向左平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -176px");
      break;
    case "向右平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -88px");
      break;
  }
};

/**
 * Update the HDZoomSlider element.
 * @param {goog.events.BrowserEvent} event Map event.
 */
ol.control.HDZoomSlider.prototype.mouseleave = function (event) {
  var title = event.target.getAttribute("title");
  switch (title) {
    case "向上平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -44px");
      break;
    case "向下平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -132px");
      break;
    case "向左平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -176px");
      break;
    case "向右平移":
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px -88px");
      break;
    default :
      this.HDMap_stdMpPan.style.setProperty("background-position", "0px 0px");
      break;
  }
};
/**
 * Update the HDZoomSlider element.
 * @param {goog.events.BrowserEvent} event Map event.
 */
ol.control.HDZoomSlider.prototype.zoomClick = function (event) {
  var title = event.target.getAttribute("title");
  var view = this.getMap()
    .getView();
  var center = view.getCenter();
  var zoomLevel = view.getZoom();
  switch (title) {
    case "向上平移":
      view.setCenter([center[0], center[1] * 1.5]);
      break;
    case "向下平移":
      view.setCenter([center[0], center[1] * 0.5]);
      break;
    case "向左平移":
      view.setCenter([center[0] * 1.5, center[1]]);
      break;
    case "向右平移":
      view.setCenter([center[0] * 0.5, center[1]]);
      break;
    case "放大一级":
      view.setZoom(zoomLevel + 1);
      break;
    case "缩小一级":
      view.setZoom(zoomLevel - 1);
      break;
    default :
      break;
  }
};


/**
 * The enum for available directions.
 *
 * @enum {number}
 */
ol.control.HDZoomSlider.direction = {
  VERTICAL: 0,
  HORIZONTAL: 1
};


/**
 * @inheritDoc
 */
ol.control.HDZoomSlider.prototype.setMap = function (map) {
  goog.base(this, 'setMap', map);
  if (map) {
    map.render();
    map.getView().on("change:resolution", function () {

    });
    var controls = map.getControls();
    controls.forEach(function (control) {
      if (control instanceof ol.control.Zoom) {
        map.removeControl(control);
      }
    });
  }
};


/**
 * Initializes the slider element. This will determine and set this controls
 * direction_ and also constrain the dragging of the thumb to always be within
 * the bounds of the container.
 *
 * @private
 */
ol.control.HDZoomSlider.prototype.initSlider_ = function () {
  var container = this.element;
  var containerSize = goog.style.getSize(container);
  goog.events.listen(this.HDMap_stdMpPan, goog.events.EventType.MOUSELEAVE,
    this.mouseleave, false, this);

  var HDMap_button = document.getElementsByClassName("HDMap_button");
  if (HDMap_button) {
    goog.array.forEach(HDMap_button, function (item, index) {
      goog.events.listen(item, goog.events.EventType.MOUSEENTER,
        this.mouseenter, false, this);
      goog.events.listen(item, goog.events.EventType.MOUSELEAVE,
        this.mouseleave, false, this);
      goog.events.listen(item, goog.events.EventType.CLICK,
        this.zoomClick, false, this);
    }, this);
  }

  var HDMap_stdMpSliderMask = document.getElementsByClassName("HDMap_stdMpSliderMask")[0];
  /**
   * @type {goog.fx.Dragger}
   * @private
   */
  this.dragger_ = new goog.fx.Dragger(this.HDMap_stdMpSliderBar);

  goog.events.listen(this.dragger_, goog.fx.Dragger.EventType.START,
    this.handleDraggerStart_, false, this);
  goog.events.listen(this.dragger_, goog.fx.Dragger.EventType.DRAG,
    this.handleDraggerDrag_, false, this);
  goog.events.listen(this.dragger_, goog.fx.Dragger.EventType.END,
    this.handleDraggerEnd_, false, this);
  //点击地图级别杆，调用相应的相应事件
  goog.events.listen(HDMap_stdMpSliderMask, goog.events.EventType.CLICK,
    this.handleContainerClick_, false, this);

  goog.events.listen(HDMap_stdMpSliderMask, goog.events.EventType.CLICK,
    goog.events.Event.stopPropagation);


  var pow = 2;
  /**
   * @type {ol.View}
   */
  var view = this.getMap().getView();
  var zoom = view.getZoom();
  /**
   * @type {number}
   */
  var maxResolution = view.getMaxResolution();

  /**
   * @type {number}
   */
  var minResolution = view.getMinResolution();
  var max = Math.log(maxResolution / minResolution) / Math.log(pow);
  var h1 = 6 * (max + 2);
  //底部减号距离顶部的距离
  var h2 = (102 - (84 - h1));
  var stdMpSliderBarTop = h1 - ((zoom + 2) * 6);
  goog.style.setStyle(this.HDMap_stdMpSliderBar, {
    "top": stdMpSliderBarTop + "px"
  });
  goog.style.setStyle(this.HDMap_stdMpCtrl, {
    "display": "block"
  });
  goog.style.setStyle(this.HDMap_stdMpSliderBgTop, {"height": h1 + "px"});
  goog.style.setStyle(this.HDMap_stdMpZoomOut, {"top": h2 + "px"});

  var thumbMargins = goog.style.getMarginBox(this.HDMap_stdMpPan);
  var thumbBorderBoxSize = goog.style.getBorderBoxSize(this.HDMap_stdMpPan);
  var thumbWidth = thumbBorderBoxSize.width +
    thumbMargins.right + thumbMargins.left;
  var thumbHeight = thumbBorderBoxSize.height +
    thumbMargins.top + thumbMargins.bottom;
  this.thumbSize_ = [thumbWidth, thumbHeight];

  var width = containerSize.width - thumbWidth;
  var height = containerSize.height - thumbHeight;

  var limits;
  if (containerSize.width > containerSize.height) {
    this.direction_ = ol.control.HDZoomSlider.direction.VERTICAL;
    limits = new goog.math.Rect(13, 0, 0, h1 - 9);
  } else {
    this.direction_ = ol.control.HDZoomSlider.direction.HORIZONTAL;
    limits = new goog.math.Rect(0, 0, width, 0);
  }
  this.dragger_.setLimits(limits);
  this.sliderInitialized_ = true;
};


/**
 * Update the HDZoomSlider element.
 * @param {ol.MapEvent} mapEvent Map event.
 * @this {ol.control.HDZoomSlider}
 * @api
 */
ol.control.HDZoomSlider.render = function (mapEvent) {
  if (!mapEvent.frameState) {
    return;
  }
  goog.asserts.assert(mapEvent.frameState.viewState,
    'viewState should be defined');
  if (!this.sliderInitialized_) {
    this.initSlider_();
  }
  var res = mapEvent.frameState.viewState.resolution;
  if (res !== this.currentResolution_) {
    this.currentResolution_ = res;
    this.setThumbPosition_(res);
  }
};


/**
 * @param {goog.events.BrowserEvent} browserEvent The browser event to handle.
 * @private
 */
ol.control.HDZoomSlider.prototype.handleContainerClick_ = function (browserEvent) {
  var map = this.getMap();
  var view = map.getView();
  var currentResolution = view.getResolution();
  goog.asserts.assert(currentResolution,
    'currentResolution should be defined');
  map.beforeRender(ol.animation.zoom({
    resolution: currentResolution,
    duration: this.duration_,
    easing: ol.easing.easeOut
  }));
  var relativePosition = this.getRelativePosition_(
    browserEvent.offsetX - this.thumbSize_[0] / 2,
    browserEvent.offsetY - this.thumbSize_[1] / 2);
  var resolution = this.getResolutionForPosition_(relativePosition);
  view.setResolution(view.constrainResolution(resolution));
};


/**
 * Handle dragger start events.
 * @param {goog.fx.DragEvent} event The drag event.
 * @private
 */
ol.control.HDZoomSlider.prototype.handleDraggerStart_ = function (event) {
  this.getMap()
    .getView()
    .setHint(ol.ViewHint.INTERACTING, 1);
};


/**
 * Handle dragger drag events.
 *
 * @param {goog.fx.DragEvent} event The drag event.
 * @private
 */
ol.control.HDZoomSlider.prototype.handleDraggerDrag_ = function (event) {
  var relativePosition = this.getRelativePosition_(event.left, event.top);
  this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
  this.getMap()
    .getView()
    .setResolution(this.currentResolution_);
};


/**
 * Handle dragger end events.
 * @param {goog.fx.DragEvent} event The drag event.
 * @private
 */
ol.control.HDZoomSlider.prototype.handleDraggerEnd_ = function (event) {
  var map = this.getMap();
  var view = map.getView();
  view.setHint(ol.ViewHint.INTERACTING, -1);
  goog.asserts.assert(this.currentResolution_,
    'this.currentResolution_ should be defined');
  map.beforeRender(ol.animation.zoom({
    resolution: this.currentResolution_,
    duration: this.duration_,
    easing: ol.easing.easeOut
  }));
  var resolution = view.constrainResolution(this.currentResolution_);
  view.setResolution(resolution);
};


/**
 * Positions the thumb inside its container according to the given resolution.
 *
 * @param {number} res The res.
 * @private
 */
ol.control.HDZoomSlider.prototype.setThumbPosition_ = function (res) {
  var position = this.getPositionForResolution_(res);
  if (this.direction_ == ol.control.HDZoomSlider.direction.HORIZONTAL) {
    var left = this.dragger_.limits.left + this.dragger_.limits.width * position;
    goog.style.setPosition(this.HDMap_stdMpSliderBar, left);
  } else {
    var top = this.dragger_.limits.top + this.dragger_.limits.height * position;
    goog.style.setPosition(this.HDMap_stdMpSliderBar, this.dragger_.limits.left, top);
  }
};


/**
 * Calculates the relative position of the thumb given x and y offsets.  The
 * relative position scales from 0 to 1.  The x and y offsets are assumed to be
 * in pixel units within the dragger limits.
 *
 * @param {number} x Pixel position relative to the left of the slider.
 * @param {number} y Pixel position relative to the top of the slider.
 * @return {number} The relative position of the thumb.
 * @private
 */
ol.control.HDZoomSlider.prototype.getRelativePosition_ = function (x, y) {
  var draggerLimits = this.dragger_.limits;
  var amount;
  if (this.direction_ === ol.control.HDZoomSlider.direction.HORIZONTAL) {
    amount = (x - draggerLimits.left) / draggerLimits.width;
  } else {
    amount = (y - draggerLimits.top) / draggerLimits.height;
  }
  return ol.math.clamp(amount, 0, 1);
};


/**
 * Calculates the corresponding resolution of the thumb given its relative
 * position (where 0 is the minimum and 1 is the maximum).
 *
 * @param {number} position The relative position of the thumb.
 * @return {number} The corresponding resolution.
 * @private
 */
ol.control.HDZoomSlider.prototype.getResolutionForPosition_ = function (position) {
  var fn = this.getMap()
    .getView()
    .getResolutionForValueFunction();
  return fn(1 - position);
};


/**
 * Determines the relative position of the slider for the given resolution.  A
 * relative position of 0 corresponds to the minimum view resolution.  A
 * relative position of 1 corresponds to the maximum view resolution.
 *
 * @param {number} res The resolution.
 * @return {number} The relative position value (between 0 and 1).
 * @private
 */
ol.control.HDZoomSlider.prototype.getPositionForResolution_ = function (res) {
  var fn = this.getMap()
    .getView()
    .getValueForResolutionFunction();
  return 1 - fn(res);
};
