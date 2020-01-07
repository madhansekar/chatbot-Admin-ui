import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Topics} from '../models/topic';

@Injectable()
export class TopicService {
  private usersUrl: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/INTW/topics';
   }

   saveTopics(data: Topics[]) {
    return this.http.put<object>(this.usersUrl + '/add', data);
   }
}
