import { Component } from '@angular/core';
import { TreeModel } from '../components/tree-list/TreeType';
import { DATALIST } from './datalist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tree-list';
  treeData: TreeModel = DATALIST;
  num = 1;
}
