import * as memoizee from 'memoizee';
// Can't install memoizee in stackblitz

export const memoize = (config: {}) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const orginalMethod = descriptor.value;
    const memoized = memoizee(orginalMethod, config);
    descriptor.value = function () {
      return memoized.apply(this, arguments);
    };
  };
};
