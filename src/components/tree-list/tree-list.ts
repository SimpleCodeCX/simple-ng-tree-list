import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TreeModel } from './TreeType';

@Component({
  selector: 'tree-list',
  templateUrl: './tree-list.html',
  styleUrls: ['./tree-list.scss']
})
export class TreeList implements OnInit, OnDestroy {

  @Input()
  public tree: TreeModel[];

  @Input()
  public parent: TreeModel;

  isSelected: Boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  fnClick(e, i) {
    if (e.target.checked) {
      this.parent.children[i].selected = true;
    }
    else {
      this.parent.children[i].selected = false;
      const index = this.parent.children.findIndex(node => node.selected);
      if (index === -1) {
        this.parent.selected === true;
        this.isSelected = true;
      }
    }
    console.log(this.parent);
  }

  flod(index) {
    this.tree[index].display = false;
  }

  unFlod(index) {
    this.tree[index].display = true;
  }

}
