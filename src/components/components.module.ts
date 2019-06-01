import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeList } from './tree-list/tree-list';
import { ParentNode } from './tree-list/parent-node/parent-node';
import { ChildNode } from './tree-list/child-node/child-node';

const COMPONENTS = [
  TreeList,
  ParentNode,
  ChildNode
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    TreeList
  ]
})
export class ComsModule {
}
