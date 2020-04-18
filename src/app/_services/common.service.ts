import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer, observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GLOBAL } from '../_helpers/global';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public globalData = GLOBAL;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getServiceCallHeader() {
    let access_token = localStorage.getItem('_access_token');
    let headers = (access_token) ? (new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + access_token)) : (new HttpHeaders().set('Content-Type', 'application/json'));
    var requestHeader: any = {};
    requestHeader.headers = headers;
    return requestHeader;
  }

  getServiceCallHeaderImg() {
    let access_token = localStorage.getItem('frontend_token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + access_token);
    var requestHeader: any = {};
    requestHeader.headers = headers;
    return requestHeader;
  }

  postReqFunction(data): Observable<any> {

    return this.http.post(this.globalData.API_URL + data.url, data.data, this.getServiceCallHeader())
      .pipe(map((response) => {

        return response;
      }), catchError(this.handleError)
      );
  }

  postImgReqFunction(data): Observable<any> {

    return this.http.post(this.globalData.API_URL + data.url, data.data, this.getServiceCallHeaderImg())
      .pipe(map((response) => {

        return response;
      }), catchError(this.handleError)
      )
  }

  getReqFunction(data): Observable<any> {

    return this.http.get(this.globalData.API_URL + data.url, this.getServiceCallHeader())
      .pipe(map((response) => {

        return response;
      }), catchError(this.handleError)
      )
  }

  putReqFunction(data): Observable<any> {

    return this.http.put(this.globalData.API_URL + data.url, data.data, this.getServiceCallHeader())
      .pipe(map((response) => {
        return response;
      }), catchError(this.handleError)
      )
  }

  putImgReqFunction(data): Observable<any> {
    return this.http.put(this.globalData.API_URL + data.url, data.data, this.getServiceCallHeaderImg())
      .pipe(map((response) => {
        return response;
      }), catchError(this.handleError)
      )
  }

  handleError(err: Response | any) {
    console.error(err);
    return throwError(err);
  }

  logout() {
    let data = { url: 'logout', data: {} };
    this.getReqFunction(data).subscribe((response: any) => {
      if (response.status) {
        localStorage.removeItem('_user_id');
        localStorage.removeItem('_access_token');
        localStorage.removeItem('_user_name');
        this.router.navigateByUrl('/login');
      }
    }, (err) => {
      console.log(err);
    });
  }

  snackMessage(message: string, type: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = type;
    config.duration = 4000;
    config.verticalPosition = 'top';         // 'top' | 'bottom'
    config.horizontalPosition = 'center';    //'start' | 'center' | 'end' | 'left' | 'right'
    this.snackBar.open(message, '', config);
  }

}
