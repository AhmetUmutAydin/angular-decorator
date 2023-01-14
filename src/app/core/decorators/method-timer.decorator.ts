import { isObservable, tap } from 'rxjs';

export const MethodTimer = () => {
  return (target: any, propertyKey: string, descriptor: any) => {
    descriptor.value = function (...args: any[]) {
      const orginalMethod = descriptor.value;
      const startTime = performance.now();
      const result = orginalMethod.apply(this);

      if (isObservable(result)) {
        return result.pipe(
          tap(() => {
            const stopTime = performance.now();
            const time = startTime - stopTime;
            console.log(time);
          })
        );
      } else {
        const stopTime = performance.now();
        const time = startTime - stopTime;
        console.log(time);
        return result;
      }
    };
    return descriptor;
  };
};
