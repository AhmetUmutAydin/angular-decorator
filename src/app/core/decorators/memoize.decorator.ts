import * as memoizee from 'memoizee';

export function memoize() {
  return function (target: any, propertyKey: string, descriptor: any) {
    const orginalMethod = descriptor.value;
    const memoizee = memoizee(orginalMethod);
    descriptor.value = function () {
      return memoizee.apply(this, arguments);
    };
  };
}