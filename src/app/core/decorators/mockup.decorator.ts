import { of } from 'rxjs';

export const Mockup = (mock: {}, fn?: ({}) => {}) => {
  return (target: any, propertyKey: string, descriptor: any) => {
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
