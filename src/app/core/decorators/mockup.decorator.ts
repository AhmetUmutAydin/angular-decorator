import { of } from 'rxjs';

export const Mockup = (mock: {}, mapperFn?: ({}) => {}) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = function (...args: any[]) {
      if (mapperFn) {
        return of(mapperFn(mock));
      } else {
        return of(mock);
      }
    };
    return descriptor;
  };
};
