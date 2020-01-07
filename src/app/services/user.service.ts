import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../models/user';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  private usersUrl: string;

  constructor(private http: HttpClient) {


      this.usersUrl = 'http://localhost:8080/INTW/users';
  }

     searchUsers(data: User):Observable<any> {
      return this.http.post<object>(this.usersUrl + '/find', data);
     }
   }

