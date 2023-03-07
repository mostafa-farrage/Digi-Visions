import { Injectable } from '@angular/core';
import { LoginViewModel } from '../components/login/view-models/login.model';
import { RoleEnum } from '../enum/role.enum';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  userRoleKey: string = "userRole"

  constructor() { }

  setUserRole(value: string) {
    localStorage.setItem(this.userRoleKey, value);
  }
  getUserRole() {
    let value: string = localStorage.getItem(this.userRoleKey);
    return value as RoleEnum;
  }
  removeUserRole() {
    localStorage.setItem(this.userRoleKey, "");
    localStorage.removeItem(this.userRoleKey);
  }
}
