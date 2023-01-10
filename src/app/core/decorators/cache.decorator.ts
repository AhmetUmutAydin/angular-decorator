import { isObservable, of, tap } from 'rxjs';
import { CacheType } from '../enums';

export const Caching = (cacheType: CacheType = CacheType.SessionStorage) => {
  return (target: any, prop: string, descriptor: any) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
      const key = createKey(target.constructor.name, prop, args);
      const data = getData(cacheType, key);

      if (data) {
        if (data.isObservable) {
          return of(data.value);
        } else {
          return data.value;
        }
      } else {
        const result = originalMethod.apply(this);
        if (isObservable(result)) {
          return result.pipe(
            tap((res) => {
              cacheData(cacheType, key, res, true);
            })
          );
        } else {
          cacheData(cacheType, key, result);
          return result;
        }
      }
    };
    return descriptor;
  };
};

//as alternative we can delete args from key, store map object for each method and use args for map
const createKey = (className: string, methodName: string, ...args: any) => {
  return `${className}_${methodName}_${JSON.stringify(args)}`;
};

const getData = (
  cacheType: CacheType,
  key: string
): { value: any; isObservable: boolean } => {
  return cacheType === CacheType.LocalStorage
    ? getDataLocalStorage(key)
    : getDataSessionStorage(key);
};

const cacheData = (
  cacheType: CacheType,
  key: string,
  value: any,
  isObservable = false
) => {
  cacheType === CacheType.LocalStorage
    ? cacheLocalStorage(key, value, isObservable)
    : cacheSessionStorage(key, value, isObservable);
};

const cacheLocalStorage = (key: string, value: any, isObservable: boolean) => {
  localStorage.setItem(key, JSON.stringify({ value, isObservable }));
};

const cacheSessionStorage = (
  key: string,
  value: any,
  isObservable: boolean
) => {
  sessionStorage.setItem(key, JSON.stringify({ value, isObservable }));
};

const getDataLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
};

const getDataSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key));
};
