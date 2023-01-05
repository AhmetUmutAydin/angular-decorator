import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostMockUp } from '../datas';
import { Caching, Mockup } from '../decorators';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(public httpClient: HttpClient) {}

  //@Mockup(PostMockUp.posts)
  @Caching()
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }
}
