import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from '../../../service/shared.service';
import { UserViewModel } from '../layout/view-model/user.model';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  mobileView: boolean = window.innerWidth < 500
  @Output() closeOrOpenSideMenu: EventEmitter<boolean> = new EventEmitter();
  @Output() enterLeaveSideMenu: EventEmitter<boolean> = new EventEmitter();
  
  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  getCurrentMoudleName(): string {
    return this.sharedService.getCurrentMoudleName()
  }
  enterORLeaveSideMenu(value) {
    if (!this.mobileView)
      this.enterLeaveSideMenu.emit(value)
  }
  closeSideMenu() {
    this.closeOrOpenSideMenu.emit(false)
  }
  logout() {
    this.sharedService.logOut()
  }
  isLtr():boolean{
    return this.sharedService.isLTR()
  }

}
