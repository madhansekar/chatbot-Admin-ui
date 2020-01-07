import {ICellRendererAngularComp} from "ag-grid-angular";
import { Component} from '@angular/core';

@Component({
    selector: 'currency-cell',
    template: `{{params.value | currency:'EUR'}}`
})
export class CurrencyRenderer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
        console.log('params',params)
    }

    refresh(): boolean {
        return false;
    }
}