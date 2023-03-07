import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
export function RBLOG(text, data?) {
const styles = ['color: white', 'background: red', 'font-size:20px'].join(';');
  if (!environment.production)
    console.log('%c%s', styles, text, data);
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }
  addToConsole(text: string) {
    if (!environment.production)
      console.log(text);
  }
  addToConsoleAsString(body: any) {
    // if (!environment.production)
    //   console.log(JSON.stringify(body));
  }
  showAlert(text: string) {
    // if (!environment.production)
    //   alert(text);
  }

}
