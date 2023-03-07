import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalizationService } from 'src/app/service/localization.service';
import { SharedService } from 'src/app/service/shared.service';
import { StorageService } from 'src/app/service/storage.service';
import { CSSFilesService } from 'src/app/service/cssFiles.service';
import { CRUDCreatePage } from 'src/app/model/crud-create.model';
import { LoginViewModel } from '../view-models/login.model';
import { RoleEnum } from 'src/app/enum/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

  page: CRUDCreatePage = new CRUDCreatePage();
  model: LoginViewModel = new LoginViewModel();
  invalidUser: boolean = false;
  logo: string;
  fieldTextType: boolean;
  lang:string;

  constructor(
    private _sharedService: SharedService,
    private _storageService: StorageService,
    private _localizationService: LocalizationService,
    private _cssFilesService:CSSFilesService,
    private _router:Router,
  ) {}

  ngOnInit(): void {
    this.lang = this._localizationService.getCurrentLanguage();
    this._cssFilesService.changeStyle()
    this.createForm()
  }

  createForm() {
    this.page.form = this._sharedService.formBuilder.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    this.page.isPageLoaded = true;
  }
  enterEvent(event) {
    if (event.key == 'Enter' && !this.disabledSubmit()) {
      this.login();
    }
  }
  
  login() {
    this.page.isSaving = true;
    Object.assign(this.model,this.page.form.value)
    setTimeout(() => {
      if([this.model.Username,this.model.Password].every(i=>i == RoleEnum.ADMIN)){
        this._storageService.setUserRole(RoleEnum.ADMIN);
        this._router.navigate(['/product'])
      }
      else if([this.model.Username,this.model.Password].every(i=>i == RoleEnum.USER)){
        this._storageService.setUserRole(RoleEnum.USER);
        this._router.navigate(['/home'])
      }
      else {
        this.invalidUser = true;
      }
      this.page.isSaving = false;
    }, 1000);
  }


  disabledSubmit() {
    return this.page.isSaving;
  }
  toggleLang(){
    this.lang = this.lang =='ar'? 'en':'ar'
    this._localizationService.setLanguage( this.lang );
    window.location.reload()
  }
}
