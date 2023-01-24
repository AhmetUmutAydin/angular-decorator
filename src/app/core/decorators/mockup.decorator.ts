import { of } from 'rxjs';

export const Mockup = (mock: {}, fn?: ({}) => {}) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = function (...args: any[]) {
      if (fn) {
        return of(fn(mock));
      } else {
        return of(mock);
      }
    };
    return descriptor;
  };
};
