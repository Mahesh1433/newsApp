import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var BaseUrl = "http://ec2-18-208-182-52.compute-1.amazonaws.com:3000/";
var NewsService = /** @class */ (function () {
    function NewsService(http) {
        // var localDB = new PouchDB('newsdb');
        // var remoteDB = new PouchDB('http://localhost:5984/newsdb');
        this.http = http;
        this.getApiUrl = "getNews";
        // localDB.replicate.to(remoteDB);
        // localDB.replicate.from(remoteDB);
        // localDB.get("5b41404d247fe505fe9ce488eb012cee").then(function (doc) {
        //   console.log(doc);
        // });
    }
    NewsService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    NewsService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    NewsService.prototype.getNewsService = function () {
        console.log("in server api");
        return this.http.get(BaseUrl + 'getNews', httpOptions).pipe(map(this.extractData), catchError(this.handleError));
    };
    NewsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], NewsService);
    return NewsService;
}());
export { NewsService };
//# sourceMappingURL=news.service.js.map