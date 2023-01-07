import { isObservable, tap } from 'rxjs';
import { CacheType } from '../enums';

const map = new Map<string, any>();

export const Caching = (cacheType: CacheType = CacheType.Default) => {
  return (target: any, prop: string, descriptor: any) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
      const key = createKey(target.constructor.name, prop);
      const data = getData(cacheType, key);

      if (data) {
        console.log(data);
      } else {
        const result = originalMethod.apply(this);
        if (isObservable(result)) {
          return result.pipe(
            tap((res) => {
              cacheData(cacheType, key, res);
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

const cacheLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const cacheSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getDataLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key));
};

const getDataSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key));
};

const createKey = (className: string, methodName: string) => {
  return `${className}_${methodName}`;
};

const getData = (cacheType: CacheType, key: string) => {
  return cacheType === CacheType.Default
    ? map.get(key)
    : cacheType === CacheType.LocalStorage
    ? getDataLocalStorage(key)
    : getDataSessionStorage(key);
};

const cacheData = (cacheType: CacheType, key: string, value: any) => {
  cacheType === CacheType.Default
    ? map.set(key, value)
    : cacheType === CacheType.LocalStorage
    ? cacheLocalStorage(key, value)
    : cacheSessionStorage(key, value);
};
