import { ControlType } from "src/app/enum/control-type.enum";
import { ColumnViewModel } from "src/app/model/column-view-model";
import { CRUDIndexPage } from "src/app/model/crud-index.model";
import { SharedService } from "src/app/service/shared.service"

export class CrudIndexBaseUtils {
  page: CRUDIndexPage = new CRUDIndexPage();
  pageRoute: string
  orderBy: string = 'ID'
  controlType = ControlType

  constructor(
    public _sharedService: SharedService
  ) { }
  //#region abstract method
  search() {
    console.error("Method search not implemented.");
  }
  getReport() {
    console.error("Method getReport not implemented.");
  }
  //#endregion method

  //#region search
  createSearchForm() {
    this.page.searchForm = this._sharedService.formBuilder.group({});
  }
  onSearchClicked() {
    this.page.options.currentPage = 1;
    this.page.orderBy = this.orderBy;
    this.page.isAscending = false;
    this.search();
  }
  onSortClicked(column: ColumnViewModel) {
    if (column.Sortable) {
      if (column.Name === this.page.orderBy) this.page.isAscending = !this.page.isAscending;
      else this.page.isAscending = false;
      this.page.orderBy = column.Name;
      this.page.options.currentPage = 1;
      this.search();
    }
  }
  resetForm() {
    this.page.searchForm.reset()
    // if (this.page.searchForm.controls['FromDate']) this.page.searchForm.controls['FromDate'].setValue(this._sharedService.dateService.getFirstDayCurrentMonth())
    // if (this.page.searchForm.controls['ToDate']) this.page.searchForm.controls['ToDate'].setValue(new Date())
    this.onSearchClicked()
  }

  //#endregion search
  //#region Table
  isColumnAscending(column: string): boolean {
    return (column != this.page.orderBy) ? null : (this.page.isAscending ? true : false);
  }
  onChangePageSize() {
    this.onSearchClicked();
  }
  getNextPrevData(pageIndex) {
    this.page.options.currentPage = pageIndex;
    this.search();
  }
  confingPagination(response) {
    this.page.options.totalItems = response.Data.Records;
    this.page.options.totalPages = response.Data.Pages;
    this.page.options.itemsPerPage = response.Data.PageSize;
  }
  //#endregion table
}
