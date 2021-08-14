import { Utils } from './index';

export class DomUtils {
  static addClass($ele, className) {
    if (!$ele) {
      return;
    }

    className = className.split(' ');

    DomUtils.getElements($ele).forEach(($this) => {
      $this.classList.add(...className);
    });
  }

  static removeClass($ele, className) {
    if (!$ele) {
      return;
    }

    className = className.split(' ');

    DomUtils.getElements($ele).forEach(($this) => {
      $this.classList.remove(...className);
    });
  }

  static hasClass($ele, className) {
    if (!$ele) {
      return false;
    }

    return $ele.classList.contains(className);
  }

  static getElement($ele) {
    if ($ele) {
      if (typeof $ele === 'string') {
        $ele = document.querySelector($ele);
      } else if ($ele.length !== undefined) {
        $ele = $ele[0];
      }
    }

    return $ele || null;
  }

  static getElements($ele) {
    if (!$ele) {
      return;
    }

    if ($ele.forEach === undefined) {
      $ele = [$ele];
    }

    return $ele;
  }

  static addEvent($ele, events, callback) {
    DomUtils.addOrRemoveEvent($ele, events, callback, 'add');
  }

  static removeEvent($ele, events, callback) {
    DomUtils.addOrRemoveEvent($ele, events, callback, 'remove');
  }

  static addOrRemoveEvent($ele, events, callback, action) {
    if (!$ele) {
      return;
    }

    events = Utils.removeArrayEmpty(events.split(' '));

    events.forEach((event) => {
      $ele = DomUtils.getElements($ele);

      $ele.forEach(($this) => {
        if (action === 'add') {
          $this.addEventListener(event, callback);
        } else {
          $this.removeEventListener(event, callback);
        }
      });
    });
  }

  static getScrollableParents($ele) {
    if (!$ele) {
      return [];
    }

    let $scrollableElems = [window];
    let $parent = $ele.parentElement;

    while ($parent) {
      let overflowValue = getComputedStyle($parent).overflow;

      if (overflowValue.indexOf('scroll') !== -1 || overflowValue.indexOf('auto') !== -1) {
        $scrollableElems.push($parent);
      }

      $parent = $parent.parentElement;
    }

    return $scrollableElems;
  }
}
