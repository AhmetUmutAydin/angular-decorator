export function Trim() {
  return function (target: Object, propertyKey: string) {
    let value: string;
    const getter = function () {
      return value;
    };
    const setter = function (newVal: string) {
      if (typeof newVal !== 'string') {
        Object.defineProperty(target, 'errors', {
          value: `Value must be string`,
        });
      } else {
        value = newVal.trim();
      }
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  };
}
