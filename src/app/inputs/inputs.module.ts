import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragNumberComponent} from './components/drag-number/drag-number.component';
import {DragNumberSidesComponent} from './components/drag-number-sides/drag-number-sides.component';


@NgModule({
  declarations: [
    DragNumberComponent,
    DragNumberSidesComponent
  ],
  exports: [
    DragNumberComponent,
    DragNumberSidesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InputsModule {
}
