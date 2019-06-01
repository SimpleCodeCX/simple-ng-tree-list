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
    this.tree && this.tree.children && this.tree.children.forEach(node => {
      const index = this.tree.children.findIndex(node => node.selected);
      if (index === -1) {
        this.tree.selected = false;
        this.tree.status = NodeStatus.BLACK;
      } else {
        this.tree.status = NodeStatus.SOME;
        const isFill = this.tree.children.every(node => node.selected === true);
        if (isFill) {
          this.tree.selected = true;
          this.tree.status = NodeStatus.FILL;
        }
      }
    });
  }

  ngOnDestroy() { }

  fnClick(e, i) {
    if (e.target.checked) {
      this.tree.children[i].status = NodeStatus.FILL;
      this.tree.children[i].selected = true;
      this.tree.children[i].children && this.tree.children[i].children.forEach(node => node.selected = true);
    }
    else {
      this.tree.children[i].selected = false;
      this.tree.children[i].status = NodeStatus.BLACK;
      this.tree.children[i].children && this.tree.children[i].children.forEach(node => node.selected = false);
    }

    const index = this.tree.children.findIndex(node => node.selected);
    if (index === -1) {
      this.tree.selected = false;
      this.tree.status = NodeStatus.BLACK;
    } else {
      this.tree.status = NodeStatus.SOME;
      const isFill = this.tree.children.every(node => node.selected === true);
      if (isFill) {
        this.tree.selected = true;
        this.tree.status = NodeStatus.FILL;
      }
    }


  }

  flod(index) {
    this.tree.children[index].display = !this.tree.children[index].display;
  }

  refreshNodeStatus(tree) {
    tree && tree.children && tree.children.forEach(node => {
      node.children && this.refreshNodeStatus(node);
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
