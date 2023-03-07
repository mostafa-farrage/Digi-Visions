import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { RoleEnum } from '../enum/role.enum';
import { SharedService } from '../service/shared.service';

@Injectable()

export class AuthGuardService implements CanActivate {
  constructor(
    public _sharedService: SharedService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role: RoleEnum = route.data["role"]
    if (!this._sharedService._storageService.getUserRole()) {
      this._sharedService.router.navigate(['/login']);
      return false;
    }
    if (this._sharedService._storageService.getUserRole() != role) {
      this._sharedService.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}