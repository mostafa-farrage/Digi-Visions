import { Component, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/enum/role.enum';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss']
})
export class RedirectPageComponent implements OnInit {
  // @Input() navigateLink :string
  constructor(private _sharedService: SharedService) { }

  ngOnInit(): void {
    let role = this._sharedService._storageService.getUserRole()
    if(role == RoleEnum.ADMIN){
      this._sharedService.router.navigate(['/product'])

    }
    else if(role == RoleEnum.USER){
      this._sharedService.router.navigate(['/home'])
    }
    else {
      this._sharedService.router.navigate(['/login'])
    }
  }
}
