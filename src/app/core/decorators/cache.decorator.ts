import { tap, isObservable } from 'rxjs';
import { StorageType } from '../enums';

export const Caching = (
  storageType: StorageType = StorageType.SessionStorage
) => {
  return (target: any, prop: string, descriptor: any) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
      const key = createKey(target.constructor.name, prop);
      const result = originalMethod.apply(this);
      if (isObservable(result)) {
        return result.pipe(
          tap((res) => {
            console.log(res);
          })
        );
      } else {
        return result;
      }
    };
    return descriptor;
  };
};

// export const  =  => {
//   (target: Object, prop: string, descriptor) => {
//     descriptor.value = (...args: any[]) => {
//       // const result = originalMethod.apply(target, args);

//       // console.log(result);
//       // switch (storageType) {
//       //   case StorageType.LocalStorage: {
//       //     cacheLocalStorage(key, descriptor);
//       //     break;
//       //   }
//       //   case StorageType.SessionStorage: {
//       //     cacheSessionStorage(key, descriptor);
//       //     break;
//       //   }
//       // }
//     };
//     return descriptor;
//   };
// };

const storeResult = () => {};

const cacheLocalStorage = (key: string, orginalMethod: Object) => {
  localStorage.setItem('test', '2');
};

const cacheSessionStorage = (key: string, orginalMethod: Object) => {
  sessionStorage.setItem('test', '3');
};

const getFromC = (key: string, orginalMethod: Object) => {
  sessionStorage.setItem('test', '3');
};

//this can be made more complex
const createKey = (className: string, methodName: string) => {
  return `${className}_${methodName}`;
};
