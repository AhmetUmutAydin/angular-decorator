export function Trim() {
  return function (target: Object, propertyKey: string) {
    const symbol = Symbol();

    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this[symbol];
      },
      set: function (newVal: string) {
        if (typeof newVal !== 'string') {
          return newVal;
        } else {
          this[symbol] = newVal.trim();
        }
      },
    });
  };
}
