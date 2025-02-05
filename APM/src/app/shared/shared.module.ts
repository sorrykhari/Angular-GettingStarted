import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpaces } from './convert-to-spaces.compnent';



@NgModule({
  declarations: [
    StarComponent,
    ConvertToSpaces
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ConvertToSpaces,
    StarComponent
  ]
})
export class SharedModule { }
