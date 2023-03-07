import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalizationService } from './localization.service';
import { LogService } from './log.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //userToken: string;

  constructor(
    private http: HttpClient,
    private localizationService: LocalizationService,
    private _logService: LogService,
    private _storageService: StorageService
  ) {
    //this.userToken = this.tokenService.getToken();
  }

  // Request options
  private setHeaders(withFiles: boolean = false): HttpHeaders {
    // console.log(this.tokenService  .getToken())
    let headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
      lang: this.localizationService.getLanguage(),
      // token: this.tokenService.getToken()
       //  this.tokenService.getToken()
    };

    let headersConfigWithImage = {
      Accept: 'application/json',
      lang: this.localizationService.getLanguage(),
      // token: this.tokenService.getToken(),
      // "QjhuaGZ6WHgxcERoSGxGbkJFVktFYVdmd3E3RXVFb3hVL2NEeTF0d3dpOD06OTA6NjM3NzUzNjIwNDM1OTAzNDg1OjIw"
      //  this.tokenService.getToken()
    };
    if (withFiles) return new HttpHeaders(headersConfigWithImage);
    else return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    // if (error.status == 401) {
    //   this._router.navigateByUrl('/login')
    // } else 
    if (error.status == 500) {
      // this._alertService.error('حدث خطأ من فضلك حاول لاحقاً');
    } else if (error.status ==  404) {
      // this._alertService.error('حدث خطأ من فضلك حاول لاحقاً');
    }
    // this._logService.addToConsole(error);
    return observableThrowError(error);
  }

  get(path: string, params?: HttpParams): Observable<any> {
    // console.log(params);
    //// console.log(environment.api+"/"+path);
    //// console.log("inside service api ");
    return this.http.get(`${environment.api}${path}`, { headers: this.setHeaders(), params }).pipe(
      catchError((er) => this.formatErrors(er)),map((res: any) => res));
  }
  post(path: string,body: Object = {},withFiles = false,withAuth:boolean = false): Observable<any> {
    this._logService.addToConsole(path+" > " + JSON.stringify(body));
    return this.http.post(`${environment.api}${path}`, body, {headers: this.setHeaders(withFiles),}).pipe(
      catchError(this.formatErrors),map((res: any) => res));
  }

  update(path: string,body: Object = {},withFiles = false): Observable<any> {
    this._logService.addToConsole(path+" > " + JSON.stringify(body));
    return this.http.put(`${environment.api}${path}`, body, {headers: this.setHeaders(withFiles),})
      .pipe(catchError(this.formatErrors),map((res: any) => res));
  }

  remove(path: string): Observable<any> {
    return this.http.delete(`${environment.api}${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors), map((res: any) => res));
  }

}
