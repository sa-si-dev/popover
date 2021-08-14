export class Utils {
  static convertToBoolean(value, defaultValue = false) {
    if (value === true || value === 'true') {
      value = true;
    } else if (value === false || value === 'false') {
      value = false;
    } else {
      value = defaultValue;
    }

    return value;
  }

  static removeArrayEmpty(array) {
    if (!Array.isArray(array) || !array.length) {
      return [];
    }

    return array.filter((d) => !!d);
  }

  static throttle(method, delay) {
    let prev = 0;
    let timeout;

    return (...args) => {
      let now = new Date().getTime();
      let remaining = delay - (now - prev);

      clearTimeout(timeout);

      if (remaining <= 0) {
        prev = now;

        method(...args);
      } else {
        timeout = setTimeout(() => {
          method(...args);
        }, remaining);
      }
    };
  }
}
