import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlType } from 'src/app/enum/control-type.enum';
@Component({
  selector: 'ng-control',
  templateUrl: './ng-control.component.html',
})
export class NgControlComponent implements OnInit {
  @Input() form!: FormGroup
  @Input() formClass: string = ''
  @Input() control!: string
  @Input() type: ControlType = ControlType.INPUT_TEXT
  @Input() value: boolean;
  @Input() label!: string
  @Input() inputClass: string = ''
  @Input() labelClass: string = ''
  @Input() descClass: string = ''
  @Input() placeholder: string = ''
  @Input() bindValue: string = 'ID'
  @Input() bindLabel: string = 'Name'
  @Input() endPlacholder: string = ''
  @Input() startPlaceholder: string = ''
  @Input() inputPlaceholderClass: string=''
  @Input() diasblePastDate: boolean = false;
  @Input() labelIcon: string = ''
  @Input() readOnly: boolean = false
  @Input() annotationTitle: string = '';
  @Input() trigger: string = 'click';
  @Input() items: any[]
  @Input() desc: string = ''
  @Input() statusColor: string = ''
  @Input() clearable: boolean = true
  @Input() templete: any
  @Input() notFoundTemplete: any
  @Input() initialValue: any
  @Input() keyword: string = "Name"
  @Input() notFoundText: string
  @Input() customFilter
  @Output() change = new EventEmitter<any>();
  @Output() inputCleared = new EventEmitter<any>();
  @Output() inputChanged = new EventEmitter<any>();
  @Output() inputSelected = new EventEmitter<any>();
  @Output() blur = new EventEmitter<any>();
  controlType = ControlType
  minDate: Date = new Date()
  @Output() keyup = new EventEmitter<any>();
  constructor() {
  }
  ngOnInit(): void {
    if (!this.diasblePastDate) {
      this.minDate.setFullYear(2000)
    }
  }
  isControlNotValidAndTouched() {
    let control = this.form.controls[this.control];
    if (control)
      return control.invalid && control.touched;
    else
      console.log(`Control Filed : ${this.control}`);;
  }
  isControlValidAndDirty() {
    let control = this.form.controls[this.control];
    if (control)
      return control.valid && control.dirty;
    else
      console.log(`Control Filed : ${this.control}`);;
  }
  isControlNotValidAndDirty() {
    let control = this.form.controls[this.control];
    if (control)
      return !control.valid && control.dirty;
    else
      console.log(`Control Filed : ${this.control}`);;
  }
  isControlHasError(error: string) {
    return this.form.controls[this.control].hasError(error);
  }
  isEmail() {
    return this.control == 'Email';
  }
  isDate() {
    return this.control == 'FromDate' || this.control == 'ToDate';
  }
  isMobile() {
    return this.control == 'Mobile';
  }
  isNationalID() {
    return this.control === 'NationalID'
  }
  isNameAraibic() {
    return this.control === 'NameArabic'
  }
  validator() {
    if (this.form.get(this.control).validator != null) {
      const validator = this.form.get(this.control).validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false
  }
  onChange(event) {
    return this.change.emit(event)
  }
  onKeyup(value) {
    this.keyup.emit(value)
  }
  onblur() {
    this.blur.emit()
  }
  onInputCleared() {
    this.inputCleared.emit()
  }
  onInputChanged(value) {
    this.inputChanged.emit(value)
  }
  onSelected(item) {
    this.inputSelected.emit(item)
  }
  isDisabled(): boolean {
    return this.form.get(this.control).disabled
  }
}
