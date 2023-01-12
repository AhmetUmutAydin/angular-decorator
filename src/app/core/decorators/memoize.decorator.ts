import * as memoizee from 'memoizee';

export const memoize = (config: {}) => {
  return (target: any, propertyKey: string, descriptor: any) => {
    const orginalMethod = descriptor.value;
    const memoized = memoizee(orginalMethod, config);
    descriptor.value = function () {
      return memoized.apply(this, arguments);
    };
  };
};
