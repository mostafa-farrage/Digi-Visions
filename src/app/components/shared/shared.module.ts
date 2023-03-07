import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { LocalizationService } from '../../service/localization.service';
import { MaxLengthPipe } from 'src/app/pipes/max-length.pipe';
import { MaxLengthDotPipe } from 'src/app/pipes/max-length-dot.pipe';
import { AuthGuardService } from 'src/app/guards/auth-guard.service ';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { LoadingComponent } from './component/loading/loading.component';
import { NgControlComponent } from './component/ng-control/ng-control.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RedirectPageComponent } from './component/redirect-page/redirect-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LayoutComponent,
    SideMenuComponent,
    MaxLengthPipe,
    MaxLengthDotPipe,
    PricePipe,
    LoadingComponent,
    ForbiddenComponent,
    RedirectPageComponent,  
    NgControlComponent, 
  ],
  imports: [
    CommonModule, FormsModule, RouterModule, ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule, NgxSkeletonLoaderModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }, isolate: true
    }),
    TimepickerModule.forRoot(),
  ],
  providers: [AuthGuardService, DatePipe],
  exports: [
    FormsModule, ReactiveFormsModule, RouterModule, ModalModule, HttpClientModule,
    TranslateModule, MaxLengthPipe,
    MaxLengthDotPipe, PricePipe, SideMenuComponent,
    LoadingComponent, TimepickerModule,NgxSkeletonLoaderModule,
    ForbiddenComponent,RedirectPageComponent, NgControlComponent
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService, private localizationService: LocalizationService) {
    this.translate.use(localizationService.getLanguage());
    localizationService.setLanguage(localizationService.getLanguage())
  }
}
