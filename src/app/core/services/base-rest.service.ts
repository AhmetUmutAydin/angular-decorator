import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseRest {
  url: string;
  constructor(private httpClient: HttpClient) {}
}
