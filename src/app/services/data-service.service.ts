import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataServiceService {

  private usersUrl: string;


  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/INTW/getData';
   }

  public getAll(): Observable<any>  {
    return this.http.get<object>(this.usersUrl);
  }
}
