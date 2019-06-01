import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TreeModel } from './TreeType';
import { renderNodeStatus } from './util';

@Component({
  selector: 'tree-list',
  templateUrl: './tree-list.html',
  styleUrls: ['./tree-list.scss']
})
export class TreeList implements OnInit, OnDestroy {

  @Input()
  public tree: TreeModel;

  constructor() { }

  ngOnInit() {
    this.initTree();
  }

  ngOnDestroy() { }

  /**
   * 初始化各个节点的勾选状态
   */
  initTree() {
    renderNodeStatus(this.tree);
  }

}
