import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {
    @Input() title :string
    @Input() desc :string
    @Input() inline :boolean = true

    constructor() { };

    ngOnInit(): void {
        
    }

}  