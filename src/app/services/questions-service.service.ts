import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Question} from '../models/question';



import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';

@Injectable()
export class QuestionsService {private usersUrl: string;


  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/INTW/questions';
   }

   saveQuestions(questions: Question[]) {
    return this.http.put<object>(this.usersUrl + '/add', questions);
   }

}
