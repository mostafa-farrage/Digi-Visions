import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from '../components/shared/component/forbidden/forbidden.component';
import { RedirectPageComponent } from '../components/shared/component/redirect-page/redirect-page.component';
import { LayoutComponent } from '../components/shared/layout/layout.component';
import { RoleEnum } from '../enum/role.enum';
import { AuthGuardService } from '../guards/auth-guard.service ';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'not-authorized', component: ForbiddenComponent
  },
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', component: RedirectPageComponent
      },
      {
        path: 'product',
        loadChildren: () => import('../components/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuardService], data: { role: RoleEnum.ADMIN }
      },
      {
        path: 'home',
        loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuardService], data: { role: RoleEnum.USER }
      }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
