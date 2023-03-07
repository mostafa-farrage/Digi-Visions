import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LogService } from './log.service';
import { LocalizationService } from './localization.service';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { ResponseViewModel } from '../model/response.model';
// import { ToastrService } from 'ngx-toastr/public_api';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // action:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  // private subject = new Subject<any>();
  // fireAction(loaded: boolean) {
  //   this.action.next(loaded);
  // }
  // subscribeAction(): Observable<boolean> {
  //   return this.action.asObservable();
  // }

  @Output() parentChildEvent = new EventEmitter<{ fromParent: boolean, data: any }>();
  fireEvent(fromParent: boolean, data?: any) {
    this.parentChildEvent.emit({ fromParent: fromParent, data: data });
  }
  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public modalService: BsModalService,
    public _logService: LogService,
    private _localizationService: LocalizationService,
    public _storageService: StorageService,
    // private toastr: ToastrService,
  ) { }

  back(){
    history.back()
  }
  isDevMode(): boolean {
    return !environment.production;
  }
  isLTR(): boolean {
    return this._localizationService.getLanguage() != 'ar';
  }
  getCurrentRoute(): string {
    return this.router.url.split("?")[0]
  }
  getRouteList(): string[] {
    return this.getCurrentRoute().split('/').filter(i => i != "")
  }
  isObjectChanged(a, b): boolean {
    for (let key in a) {
      if (a[key] != b[key]) return true;
    }
  }
  getSumValues(list: any[]): number {
    return list.reduce((acc, cur) => acc + cur, 0);
  }
  getCurrentMoudleName(): string {
    return this.router.url.split('?')[0].split('/')[1];
  }
  getCurrenPageName(): string {
    return this.router.url.split('?')[0].split('/')[2]?.split('?')[0]
  }
  showToastr(response: ResponseViewModel) {
    if (response.Success) this.showSuccessAlert(response.Message)
    else this.showErrorAlert(response.Message)
  }
  showErrorAlert(message: string) {
    let enMessage: string = 'The proccess is done successfully'
    let arMessage: string = 'العملية تمت بنجاح'
    alert(this.isLTR()?arMessage:enMessage)
    // this.toastr.error('', message, {
    //   toastClass: 'errorToastClass',
    // });
  }
  showSuccessAlert(message: string) {
    let enMessage: string = 'The proccess is done successfully'
    let arMessage: string = 'العملية تمت بنجاح'
    alert(this.isLTR()?arMessage:enMessage)

    // this.toastr.success('', message, {
    //   toastClass: 'successToastClass',
    // });
  }
  logOut() {
    this._storageService.removeUserRole();
    this.router.navigate(['/login']);
  }

  getDomainName(): string {
    return window.location.href.split('://')[1].split('/')[0]
  }
  sortBy = (function () {
    var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };
    return function sortby(array, prop) {
      if (!(array instanceof Array && array.length)) return [];
      if (toString.call(prop) !== "[object Object]") prop = {};
      if (typeof prop.parser !== "function") prop.parser = parse;
      prop.desc = !!prop.desc ? -1 : 1;
      return array.sort(function (a, b) {
        a = getItem.call(prop, a);
        b = getItem.call(prop, b);
        return prop.desc * (a < b ? -1 : +(a > b));
      });
    };
  }());
  downloadFile(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    anchor.download = fileName + ' ' + new Date().toLocaleDateString() + ' .xls';
    anchor.href = url;
    anchor.click();
  }
}