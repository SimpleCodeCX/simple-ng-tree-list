import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TreeModel, NodeStatus } from './TreeType';
let UNIQUE_COUNT = 0;
@Component({
  selector: 'tree-list',
  templateUrl: './tree-list.html',
  styleUrls: ['./tree-list.scss']
})
export class TreeList implements OnInit, OnDestroy {

  @Input()
  public tree: TreeModel;

  @Input()
  public parent: TreeModel;

  key: number = UNIQUE_COUNT++;

  constructor() { }

  ngOnInit() {
    this.parent && (this.tree.parent = this.parent);
    this.renderNodeStatus(this.tree);
  }

  ngOnDestroy() { }

  contextmenuClick(e, i) {
    alert(`您选择了节点${i}`);
    return false;
  }
  checkboxClick(e, i) {
    if (e.target.checked) {
      this.renderSelected(this.tree.children[i], true);
      this.tree.parent && this.renderParentNodeStatus(this.tree);
    }
    else {
      this.renderSelected(this.tree.children[i], false);
      this.tree.parent && this.renderParentNodeStatus(this.tree);
    }

    this.renderNodeStatus(this.tree);
  }

  flod(index) {
    this.tree.children[index].display = !this.tree.children[index].display;
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

  renderNodeStatus(tree) {
    tree && tree.children && tree.children.forEach(node => {
      node.children && this.renderNodeStatus(node);
      const index = tree.children.findIndex(node => node.selected);
      if (index === -1) {
        tree.selected = false;
        tree.status = NodeStatus.BLACK;
      } else {
        tree.status = NodeStatus.SOME;
        tree.selected = false;
        const isFill = tree.children.every(node => node.selected === true);
        if (isFill) {
          tree.selected = true;
          tree.status = NodeStatus.FILL;
        }
      }
    });
  }

  renderParentNodeStatus(parent) {
    parent.children.forEach(node => {
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
