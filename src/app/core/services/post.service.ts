import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostMockUp } from '../datas';
import { Caching, MethodTimer, Mockup } from '../decorators';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(public httpClient: HttpClient) {}

  @MethodTimer()
  @Mockup(PostMockUp.posts)
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }
}
