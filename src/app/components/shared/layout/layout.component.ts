import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/service/localization.service';
import { SharedService } from '../../../service/shared.service';
import { LayoutService } from './layout.service';
import { VendorNameViewModel } from './view-model/vendor-name.model';
import { UserViewModel } from './view-model/user.model';
import { CSSFilesService } from 'src/app/service/cssFiles.service';
import { CRUDIndexPage } from 'src/app/model/crud-index.model';
import { SelectItem } from 'src/app/model/select-view-model';
import { LanguageTypeEnum } from 'src/app/enum/language-type.enum';
import { RoleEnum } from 'src/app/enum/role.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  page: CRUDIndexPage = new CRUDIndexPage()
  item: VendorNameViewModel = new VendorNameViewModel()
  user: UserViewModel = new UserViewModel()
  closeSideMenu: boolean //= window.innerWidth <787
  enterSideMenu: boolean;
  todayDate: any = new Date()
  isAdmin: boolean = false
  languageList: SelectItem[] = [
    { ID: LanguageTypeEnum.EN, Name: "English", Url: 'en', Selected: false },
    { ID: LanguageTypeEnum.AR, Name: "العربية", Url: 'ar', Selected: false }
  ]
  language: SelectItem = new SelectItem()
  role: RoleEnum;

  constructor(
    private sharedService: SharedService,
    private _localizationService: LocalizationService,
    private _layoutService: LayoutService,
    private _cssFilesService: CSSFilesService
  ) { }

  ngOnInit(): void {
    this.role = this.sharedService._storageService.getUserRole()
    this.isAdmin = this.sharedService._storageService.getUserRole() == RoleEnum.ADMIN
    this.initializePage()
  }

  initializePage() {
    if (this._localizationService.getCurrentLanguage() != this._localizationService.getLanguage()) {
      window.location.reload();
      return;
    }
    if (this._localizationService.getLanguage() == 'ar')
      this.language = this.languageList[1]
    else
      this.language = this.languageList[0]
    this._cssFilesService.changeStyle(this.language.Url)
    this.page.isPageLoaded = true
  }
  closeOrOpenSideMenu(value) {
    this.closeSideMenu = value
  }
  enterLeaveSideMenu(value) {
    this.enterSideMenu = value
  }
  changeLanguage(index) {
    let oldLang: LanguageTypeEnum = this._localizationService.getLanguage() == "ar" ? LanguageTypeEnum.AR : LanguageTypeEnum.EN
    if (oldLang == this.languageList[index].ID) return;
    this.language = this.languageList[index]
    this._localizationService.setLanguage(this.language.Url);
    window.location.reload()
  }
  logout() {
    this.sharedService.logOut()
  }
}
