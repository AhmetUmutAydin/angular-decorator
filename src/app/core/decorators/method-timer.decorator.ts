import { isObservable, tap } from 'rxjs';

let interval: any;

export const MethodTimer = () => {
  return (target: any, propertyKey: string, descriptor: any) => {
    descriptor.value = function (...args: any[]) {
      const orginalMethod = descriptor.value;
      startTimer();
      const result = orginalMethod.apply(this);
      if (isObservable(result)) {
        return result.pipe(
          tap(() => {
            stopTimer();
          })
        );
      } else {
        stopTimer();
        return result;
      }
    };
    return descriptor;
  };
};

function startTimer() {
  this.interval = setInterval(() => {}, 1000);
}

function stopTimer() {
  clearInterval(this.interval);
}
