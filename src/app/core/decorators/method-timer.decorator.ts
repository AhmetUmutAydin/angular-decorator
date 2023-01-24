import { isObservable, tap } from 'rxjs';

export const MethodTimer = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const startTime = performance.now();
      const result = originalMethod.apply(this);
      if (isObservable(result)) {
        return result.pipe(
          tap(() => {
            const stopTime = performance.now();
            const time = stopTime - startTime;
            console.log(time);
          })
        );
      } else {
        const stopTime = performance.now();
        const time = stopTime - startTime;
        console.log(time);
        return result;
      }
    };
    return descriptor;
  };
};
