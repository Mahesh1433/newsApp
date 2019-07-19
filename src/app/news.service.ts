import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import PouchDB from 'pouchdb';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const BaseUrl = "http://localhost:3000/";
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  data:any;

  constructor(private http: HttpClient) { 
    
    var localDB = new PouchDB('newsdb');
    var remoteDB = new PouchDB('http://localhost:5984/newsdb');

    localDB.replicate.to(remoteDB);
    localDB.replicate.from(remoteDB);

    
    localDB.get("5b41404d247fe505fe9ce488eb012cee").then(function (doc) {
    
      console.log(doc);
    });
  }



  getApiUrl : string = "getNews";

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getNewsService(): Observable<any> {
    return this.http.get(BaseUrl+'getNews', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
    }