import * as memoizee from 'memoizee';

export function memoize() {
  return function (target: any, propertyKey: string, descriptor: any) {
    const oldFunction = descriptor.value;
    const newFunction = memoizee(oldFunction);
    descriptor.value = function () {
      return newFunction.apply(this, arguments);
    };
  };
}
