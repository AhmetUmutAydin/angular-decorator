import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { Trim } from './core/decorators';
import { Post } from './core/models';
import { PostService, PostWithRestApiDecoratorService } from './core/services';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  posts$: Observable<Post[]>;
  postsDecorator$: Observable<Post[]>;

  @Trim()
  test = 'Test. ';

  constructor(
    private postService: PostService,
    private postsDecorator: PostWithRestApiDecoratorService
  ) {
    this.posts$ = this.postService.getPosts();
    this.postsDecorator$ = this.postsDecorator.getPosts();
    console.log(this.test + ':');
  }
}
