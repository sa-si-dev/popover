import { Utils, DomUtils } from './utils';
import { Popper } from './popper';

const PopoverComponentVersion = 'v1.0.0';

const keyDownMethodMapping = {
  27: 'onEscPress',
};

export class PopoverComponent {
  /**
   * @property {(element|string)} ele - Trigger element to toggle popover element
   * @property {string} target - CSS selector to get popover element
   * @property {string} [position=auto] - Position of popover element (auto, top, bottom, left, right, top left, top right, bottom left, bottom right, left top, left bottom, right top, right bottom)
   * @property {number} [margin=8] - Space between popover element and its Trigger element (in pixel)
   * @property {number} [enterDelay=0] - Delay time before showing popover element (in milliseconds)
   * @property {number} [exitDelay=0] - Delay time before hiding popover element (in milliseconds)
   * @property {number} [showDuration=300] - Transition duration for show animation (in milliseconds)
   * @property {number} [hideDuration=200] - Transition duration for hide animation (in milliseconds)
   * @property {number} [transitionDistance=10] - Distance to translate on show/hide animation (in pixel)
   * @property {number} [zIndex=1] - CSS z-index value for popover element
   * @property {boolean} [hideOnOuterClick=true] - Hide on clicking outside of popover element
   * @property {boolean} [showOnHover=false] - Show popover element on hovering trigger element
   * @property {boolean} [hideArrowIcon=false] - Hide arrow icon in the popover
   * @property {function} [afterShow] - Callback function for after showing popover
   * @property {function} [afterHide] - Callback function for after hiding popover
   */
  constructor(options) {
    try {
      this.setProps(options);
      this.init();
    } catch (e) {
      console.warn(`Couldn't initiate Popover component`);
      console.error(e);
    }
  }

  init() {
    if (!this.$popover) {
      return;
    }

    this.setElementProps();
    this.renderArrow();
    this.initPopper();
    this.addEvents();
  }

  /** dom event methods - start */
  getEvents() {
    let events = [
      { $ele: document, event: 'click', method: 'onDocumentClick' },
      { $ele: document, event: 'keydown', method: 'onDocumentKeyDown' },
      { $ele: this.$ele, event: 'click', method: 'onTriggerEleClick' },
    ];

    if (this.showOnHover) {
      events.push({ $ele: this.$ele, event: 'mouseenter', method: 'onTriggerEleMouseEnter' });
      events.push({ $ele: this.$ele, event: 'mouseleave', method: 'onTriggerEleMouseLeave' });
    }

    return events;
  }

  addOrRemoveEvents(action) {
    let events = this.getEvents();

    events.forEach((d) => {
      this.addOrRemoveEvent(d.$ele, d.event, d.method, action);
    });
  }

  addEvents() {
    this.addOrRemoveEvents('add');
  }

  removeEvents() {
    this.addOrRemoveEvents('remove');
  }

  addOrRemoveEvent($ele, events, method, action) {
    if (!$ele) {
      return;
    }

    events = Utils.removeArrayEmpty(events.split(' '));

    events.forEach((event) => {
      let eventsKey = `${method}-${event}`;
      let callback = this.events[eventsKey];

      if (!callback) {
        callback = this[method].bind(this);
        this.events[eventsKey] = callback;
      }

      if (action === 'add') {
        DomUtils.addEvent($ele, event, callback);
      } else {
        DomUtils.removeEvent($ele, event, callback);
      }
    });
  }

  onDocumentClick(e) {
    let $target = e.target;
    let $triggerEle = $target.closest('.pop-comp-ele');
    let $popoverEle = $target.closest('.pop-comp-wrapper');

    if (this.hideOnOuterClick && $triggerEle !== this.$ele && $popoverEle !== this.$popover) {
      this.hide();
    }
  }

  onDocumentKeyDown(e) {
    let key = e.which || e.keyCode;
    let method = keyDownMethodMapping[key];

    if (method) {
      this[method](e);
    }
  }

  onEscPress() {
    if (this.hideOnOuterClick) {
      this.hide();
    }
  }

  onTriggerEleClick() {
    this.toggle();
  }

  onTriggerEleMouseEnter() {
    this.show();
  }

  onTriggerEleMouseLeave() {
    this.hide();
  }
  /** dom event methods - end */

  /** set methods - start */
  setProps(options) {
    options = this.setDefaultProps(options);
    this.setPropsFromElementAttr(options);

    let convertToBoolean = Utils.convertToBoolean;

    this.$ele = options.ele;
    this.target = options.target;
    this.position = options.position;
    this.margin = parseFloat(options.margin);
    this.enterDelay = parseFloat(options.enterDelay);
    this.exitDelay = parseFloat(options.exitDelay);
    this.showDuration = parseFloat(options.showDuration);
    this.hideDuration = parseFloat(options.hideDuration);
    this.transitionDistance = parseFloat(options.transitionDistance);
    this.zIndex = parseFloat(options.zIndex);
    this.hideOnOuterClick = convertToBoolean(options.hideOnOuterClick);
    this.showOnHover = convertToBoolean(options.showOnHover);
    this.hideArrowIcon = convertToBoolean(options.hideArrowIcon);
    this.afterShowCallback = options.afterShow;
    this.afterHideCallback = options.afterHide;

    this.events = {};

    this.$popover = DomUtils.getElement(this.target);
  }

  setDefaultProps(options) {
    let defaultOptions = {
      position: 'auto',
      margin: 8,
      enterDelay: 0,
      exitDelay: 0,
      showDuration: 300,
      hideDuration: 200,
      transitionDistance: 10,
      zIndex: 1,
      hideOnOuterClick: true,
      showOnHover: false,
      hideArrowIcon: false,
    };

    return Object.assign(defaultOptions, options);
  }

  setPropsFromElementAttr(options) {
    let $ele = options.ele;
    let mapping = {
      'data-popover-target': 'target',
      'data-popover-position': 'position',
      'data-popover-margin': 'margin',
      'data-popover-enter-delay': 'enterDelay',
      'data-popover-exit-delay': 'exitDelay',
      'data-popover-show-duration': 'showDuration',
      'data-popover-hide-duration': 'hideDuration',
      'data-popover-transition-distance': 'transitionDistance',
      'data-popover-z-index': 'zIndex',
      'data-popover-hide-on-outer-click': 'hideOnOuterClick',
      'data-popover-show-on-hover': 'showOnHover',
      'data-popover-hide-arrow-icon': 'hideArrowIcon',
    };

    for (let k in mapping) {
      let value = $ele.getAttribute(k);

      if (value) {
        options[mapping[k]] = value;
      }
    }
  }

  setElementProps() {
    let $ele = this.$ele;
    this.$popover.popComp = this;
    $ele.popComp = this;
    $ele.show = PopoverComponent.showMethod;
    $ele.hide = PopoverComponent.hideMethod;

    DomUtils.addClass(this.$ele, 'pop-comp-ele');
    DomUtils.addClass(this.$popover, 'pop-comp-wrapper');
  }
  /** set methods - end */

  initPopper() {
    let options = {
      $popperEle: this.$popover,
      $triggerEle: this.$ele,
      $arrowEle: this.$arrowEle,
      position: this.position,
      margin: this.margin,
      enterDelay: this.enterDelay,
      exitDelay: this.exitDelay,
      showDuration: this.showDuration,
      hideDuration: this.hideDuration,
      transitionDistance: this.transitionDistance,
      zIndex: this.zIndex,
      afterShow: this.afterShow.bind(this),
      afterHide: this.afterHide.bind(this),
    };

    this.popper = new Popper(options);
  }

  show() {
    if (this.isShown()) {
      return;
    }

    DomUtils.addClass(this.$popover, 'pop-comp-disable-events');

    this.popper.show(true);

    DomUtils.addClass(this.$ele, 'pop-comp-active');
  }

  hide() {
    if (!this.isShown()) {
      return;
    }

    this.popper.hide();
  }

  toggle(show) {
    if (show === undefined) {
      show = !this.isShown();
    }

    if (show) {
      this.show();
    } else {
      this.hide();
    }
  }

  isShown() {
    return DomUtils.hasClass(this.$ele, 'pop-comp-active');
  }

  afterShow() {
    DomUtils.removeClass(this.$popover, 'pop-comp-disable-events');

    if (typeof this.afterShowCallback === 'function') {
      this.afterShowCallback(this);
    }
  }

  afterHide() {
    DomUtils.removeClass(this.$ele, 'pop-comp-active');

    if (typeof this.afterHideCallback === 'function') {
      this.afterHideCallback(this);
    }
  }

  renderArrow() {
    if (this.hideArrowIcon) {
      return;
    }

    let $arrowEle = this.$popover.querySelector('.pop-comp-arrow');

    if (!$arrowEle) {
      this.$popover.insertAdjacentHTML('afterbegin', '<i class="pop-comp-arrow"></i>');
      $arrowEle = this.$popover.querySelector('.pop-comp-arrow');
    }

    this.$arrowEle = $arrowEle;
  }

  destory() {
    this.removeEvents();
  }

  /** static methods - start */
  static init(options) {
    let $eleArray = options.ele;

    if (!$eleArray) {
      return;
    }

    let singleEle = false;

    if (typeof $eleArray === 'string') {
      $eleArray = document.querySelectorAll($eleArray);

      if (!$eleArray) {
        return;
      }

      if ($eleArray.length === 1) {
        singleEle = true;
      }
    }

    if ($eleArray.length === undefined) {
      $eleArray = [$eleArray];
      singleEle = true;
    }

    let instances = [];
    $eleArray.forEach(($ele) => {
      options.ele = $ele;
      PopoverComponent.destory($ele);
      instances.push(new PopoverComponent(options));
    });

    return singleEle ? instances[0] : instances;
  }

  static destory($ele) {
    if (!$ele) {
      return;
    }

    let popComp = $ele.popComp;

    if (popComp) {
      popComp.destory();
    }
  }

  static version() {
    return PopoverComponentVersion;
  }

  static showMethod() {
    return this.popComp.show();
  }

  static hideMethod() {
    return this.popComp.hide();
  }
  /** static methods - end */
}

window.PopoverComponent = PopoverComponent;
