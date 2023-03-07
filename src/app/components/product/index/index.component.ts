import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { ProductViewModel } from '../view-models/product.model';
import { ProductSearchViewModel } from '../view-models/product-search.model';
import { ProductService } from '../product.service';
import { CrudIndexBaseUtils } from 'src/app/components/shared/utils/crud-index.utils';
import { CRUDCreatePage } from 'src/app/model/crud-create.model';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent extends CrudIndexBaseUtils implements OnInit {
  pageCreate: CRUDCreatePage = new CRUDCreatePage();
  items: ProductViewModel[] = [];
  advancedSearch: boolean = false;
  selectedItem: ProductViewModel = new ProductViewModel();
  modalRef: BsModalRef;
  searchViewModel: ProductSearchViewModel = new ProductSearchViewModel();

  @ViewChild('deleteTemplate', { static: false }) deleteTemplate: any;

  constructor(
    private _pageService: ProductService,
    public _sharedService: SharedService,
  ) {
    super(_sharedService);
  }
  ngOnDestroy(): void {
    
  }
  ngOnInit() {
    this.initializePage();
  }
  initializePage() {
    this.page.columns = [
      { Name: "title", Title: "shared.product", Selectable: true, Sortable: false },
      { Name: "price", Title: "shared.price", Selectable: true, Sortable: false },
      { Name: "count", Title: "shared.count", Selectable: true, Sortable: false },
      { Name: "rate", Title: "shared.rate", Selectable: true, Sortable: false },
      { Name: "description", Title: "shared.description", Selectable: true, Sortable: false },
    ];
    this.createSearchForm();
    this.search()
  }
  createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({
      ID: [this.searchViewModel.ID],
    });
    this.page.isPageLoaded = true;
  }
  search() {
    this.page.isSearching = true;
    this.items = [];
    this._pageService.getProducts().subscribe(response => {
      this.page.isSearching = false;
      this.page.isAllSelected = false;
      this.items = response as ProductViewModel[];
    });
  }
  showDeleteConfirmation(selectedItem: ProductViewModel) {
    this.selectedItem = selectedItem;
    this.modalRef = this._sharedService.modalService.show(this.deleteTemplate, { class: 'modal-440', });
  }
  remove() {
    this.page.isSaving = true
    this._pageService.removeProduct(this.selectedItem.id).subscribe(res => {
      this._sharedService.showToastr(res);
      this.page.isSaving = false
      if(res){
        this.items.splice(this.items.findIndex(i => i.id == this.selectedItem.id), 1)
        this.modalRef.hide();
      }
    },(err)=>{this.page.isSaving = false})
  }
  disabledSubmit() {
    return (this.pageCreate.isSaving || !this.pageCreate.form.valid);
  }
}
