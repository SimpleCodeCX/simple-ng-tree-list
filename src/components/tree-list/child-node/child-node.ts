import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TreeModel, NodeStatus } from '../TreeType';
import { renderNodeStatus } from '../util';

let UNIQUE_COUNT = 0;

@Component({
  selector: 'child-node',
  templateUrl: './child-node.html',
  styleUrls: ['./child-node.scss']
})
export class ChildNode implements OnInit, OnDestroy {

  @Input()
  public tree: TreeModel;

  @Input()
  public parent: TreeModel;

  key: number = UNIQUE_COUNT++;

  constructor() { }

  ngOnInit() {
    this.parent && (this.tree.parent = this.parent);
    this.tree.key = UNIQUE_COUNT;
  }

  ngOnDestroy() { }

  contextmenuClick(e) {
    alert(`您选择了节点${this.key}`);
    return false;
  }

  checkboxClick(e) {
    if (e.target.checked) {
      this.renderSelected(this.tree, true);
      this.tree.parent && this.renderParentNodeStatus(this.tree);
    }
    else {
      this.renderSelected(this.tree, false);
      this.tree.parent && this.renderParentNodeStatus(this.tree);
    }
    renderNodeStatus(this.tree);
  }

  flod() {
    this.tree.display = !this.tree.display;
  }

  renderSelected(node, isSelected: boolean) {
    if (isSelected) {
      node.status = NodeStatus.FILL;
      node.selected = true;
    } else {
      node.status = NodeStatus.BLACK;
      node.selected = false;
    }
    node.children && node.children.forEach(node => this.renderSelected(node, isSelected));
  }

  renderParentNodeStatus(parent) {
    parent.children && parent.children.forEach(node => {
      const index = parent.children.findIndex(node => node.selected);
      if (index === -1) {
        parent.selected = false;
        parent.status = NodeStatus.BLACK;
      } else {
        parent.status = NodeStatus.SOME;
        parent.selected = false;
        const isFill = parent.children.every(node => node.selected === true);
        if (isFill) {
          parent.selected = true;
          parent.status = NodeStatus.FILL;
        }
      }
    });
    parent.parent && this.renderParentNodeStatus(parent.parent);
  }

}
