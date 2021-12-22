import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragNumberComponent } from './components/drag-number/drag-number.component';



@NgModule({
  declarations: [
    DragNumberComponent
  ],
  exports: [
    DragNumberComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InputsModule { }
