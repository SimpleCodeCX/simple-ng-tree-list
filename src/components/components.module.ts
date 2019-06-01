import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeList } from './tree-list/tree-list';
import { ChildNode } from './tree-list/child-node/child-node';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TreeList,
    ChildNode
  ],
  exports: [
    TreeList
  ]
})
export class ComsModule {
}
