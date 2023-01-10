import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caching } from '../decorators';
import { CacheType } from '../enums';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(public httpClient: HttpClient) {}

  //@Mockup(PostMockUp.posts)
  @Caching(CacheType.SessionStorage)
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }
}
