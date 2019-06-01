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

  key: number = UNIQUE_COUNT++;

  imgSrc = "../../assets/imgs/checkbox-blank-line.svg";
  constructor() { }

  ngOnInit() {
    this.renderNodeStatus(this.tree);
  }

  ngOnDestroy() { }

  fnClick(e, i) {
    if (e.target.checked) {
      this.renderSelected(this.tree.children[i], true);
    }
    else {
      this.renderSelected(this.tree.children[i], false);
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
        const isFill = tree.children.every(node => node.selected === true);
        if (isFill) {
          tree.selected = true;
          tree.status = NodeStatus.FILL;
        }
      }
    });
  }
}
