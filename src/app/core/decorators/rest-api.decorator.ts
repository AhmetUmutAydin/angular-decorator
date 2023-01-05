import { HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { HttpMethod } from '../enums';
import { BaseRest } from '../services';

const param_key = 'url_parameters';
const body_key = 'body';

export const Client = (url: string) => {
  return (target: any) => {
    target.prototype.url = url;
  };
};

export const ApiRequest = (endpoint: string, httpMethod: HttpMethod) => {
  return (
    target: BaseRest,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const urlParams = target[param_key]?.filter(
      (f) => f.propertyKey === propertyKey
    );

    const bodyParam = target[body_key]?.find(
      (f) => f.propertyKey === propertyKey
    );

    descriptor.value = function (...args: any[]) {
      let url = `${this.url}${endpoint}`;
      let params = new HttpParams();
      const body = bodyParam ? args[bodyParam.index] : null;

      if (urlParams) {
        for (const param of urlParams) {
          const key = `:${param.key}`;
          if (url.includes(key)) {
            url = url.replace(key, args[param.index]);
          } else {
            params = params.append(param.key, args[param.index]);
          }
        }
      }

      const request = new HttpRequest(httpMethod, url, body, {
        params: params,
      });

      return this.httpClient
        .request(request)
        .pipe(map((response: HttpResponse<any>) => response.body));
    };

    return descriptor;
  };
};

export const UrlParam = (param) => {
  return (target: BaseRest, propertyKey: string, propertyIndex: number) => {
    const urlParam = {
      key: param,
      propertyKey,
      index: propertyIndex,
    };

    if (Array.isArray(target[param_key])) {
      target[param_key].push(urlParam);
    } else {
      target[param_key] = [urlParam];
    }
  };
};

export const Body = (
  target: BaseRest,
  propertyKey: string,
  propertyIndex: number
) => {
  const body = { index: propertyIndex, propertyKey };
  if (Array.isArray(target[body_key])) {
    target[body_key].push(body);
  } else {
    target[body_key] = [body];
  }
};
