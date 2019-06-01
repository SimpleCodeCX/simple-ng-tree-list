import { Component } from '@angular/core';
import { TreeModel } from '../components/tree-list/TreeType';
import { deleteSelected, renderNodeStatus } from '../components/tree-list/util';
import { DATALIST } from './datalist';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tree-list';
  treeData: TreeModel = DATALIST;
  addCount: number = 0;

  constructor() { }

  addNode() {
    this.addCount++;
    this.treeData.children.unshift({
      name: `新节点${this.addCount}`
    });
  }

  deleteNode() {
    deleteSelected(this.treeData);
    renderNodeStatus(this.treeData);
  }

}
