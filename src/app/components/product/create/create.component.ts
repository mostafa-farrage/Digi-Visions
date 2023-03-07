import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlType } from 'src/app/enum/control-type.enum';
import { CRUDCreatePage } from 'src/app/model/crud-create.model';
import { ListService } from 'src/app/service/list.service';
import { SharedService } from 'src/app/service/shared.service';
import { ProductService } from '../product.service';
import { ProductCreateViewModel } from '../view-models/product-create.model';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  page: CRUDCreatePage = new CRUDCreatePage();
  model: ProductCreateViewModel = new ProductCreateViewModel();
  categoryList: string[]=[]
  controlType = ControlType
  
  constructor(
    private _sharedService: SharedService,
    private _pageService: ProductService,
    private _listService: ListService,
    private _activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.initializePage();
  }
  initializePage() {
    this.page.isPageLoaded = false;
    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.model.id = +params.get('id');
        this.page.isEdit = true;
      }
    });
    this._listService.getCategoryList().subscribe((res)=>{
      this.categoryList = res
      if (this.page.isEdit) {
        this.getByID();
      } else {
        this.createForm();
      }
    })
  }
  getByID() {
    this._pageService.getProductbyID(this.model.id).subscribe((res) => {
      if (res) {
        this.model = res;
        this.createForm();
      }
    });
  }
  createForm() {
    this.page.form = this._sharedService.formBuilder.group({
      id: [this.model.id],
      title: [this.model.title, [Validators.required]],
      price: [this.model.price, [Validators.required]],
      category: [this.model.category, [Validators.required]],
      description: [this.model.description, [Validators.required]],
    });
    this.page.isPageLoaded = true;
  }
  save() {
    this.page.isSaving = true;
    Object.assign(this.model, this.page.form.value);
    this._pageService.postOrUpdateProduct(this.model).subscribe(response => {
      this.page.isSaving = false;
      this.page.responseViewModel = response;
      this._sharedService.showToastr(response);
      if (response.id>0) {
        this._sharedService.router.navigate(['/product'])
      }
    }, ((err) => { this.page.isSaving = false; }))
  }

  get category(){
    return this.page.form.get('category')
  }
  disabledSubmit() {
    return this.page.isSaving || this.page.form.invalid;
  }
}
