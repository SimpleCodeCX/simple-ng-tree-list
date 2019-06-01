import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeList } from './tree-list/tree-list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TreeList
  ],
  exports: [
    TreeList
  ]
})
export class ComsModule {
}
