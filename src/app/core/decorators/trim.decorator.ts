export function Trim() {
  return function (target: any, propertyKey: string) {
    const symbol = Symbol();

    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this[symbol];
      },
      set: function (newVal: string) {
        this[symbol] = newVal.trim();
      },
    });
  };
}
