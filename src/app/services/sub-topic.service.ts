import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SubTopics} from '../models/sub-topics';

@Injectable()
export class SubTopicService {
  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/INTW/subtopics';
   }

   saveSubTopics(data: SubTopics[]) {
    return this.http.put<object>(this.usersUrl + '/add', data);
   }
}
