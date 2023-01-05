import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequest, Body, Client, UrlParam } from '../decorators';
import { HttpMethod } from '../enums';
import { Post } from '../models';
import { BaseRest } from './base-rest.service';

@Injectable({
  providedIn: 'root',
})
@Client('https://jsonplaceholder.typicode.com/')
export class PostWithRestApiDecoratorService extends BaseRest {
  @ApiRequest('posts', HttpMethod.GET) //https://jsonplaceholder.typicode.com/posts
  getPosts(): Observable<Post[]> {
    return null;
  }

  @ApiRequest('posts/:id', HttpMethod.GET) //posts/1
  getUser(@UrlParam('id') id: number): Observable<any> {
    return null;
  }

  @ApiRequest('posts', HttpMethod.GET) //posts?id=1
  getUser2(@UrlParam('id') id: number): Observable<any> {
    return null;
  }

  @ApiRequest('posts', HttpMethod.POST) //posts with  ids object
  postUser(@Body { ids }): Observable<any> {
    return null;
  }
}
