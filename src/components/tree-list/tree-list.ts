import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TreeModel, EditMode } from './TreeType';
import { renderNodeStatus, deleteSelected } from './util';

@Component({
  selector: 'tree-list',
  templateUrl: './tree-list.html',
  styleUrls: ['./tree-list.scss']
})
export class TreeList implements OnInit, OnDestroy {

  @Input()
  public tree: TreeModel;

  @Input()
  editRoot: boolean = false;

  editMode: EditMode;
  addValue: string = '';

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

  /**
   * 在根节点添加子节点
   */
  addNode() {
    this.tree.children.unshift({
      name: this.addValue || '未命名'
    });
    this.addValue = '';
    this.editMode = EditMode.EDIT;
  }

  /**
   * 删除勾选的节点
   */
  deleteNode() {
    deleteSelected(this.tree);
    renderNodeStatus(this.tree);
    this.editMode = EditMode.EDIT;
  }

  /**
   * 开启根节点添加模式
   */
  switchToAddNodeMode() {
    this.editMode = EditMode.ADD;
  }

  /**
   * 开启删除模式
   */
  switchToDeleteNodeMode() {
    this.editMode = EditMode.DELETE;
  }

  /**
   * 取消根节点编辑状态
   */
  cancelEdit() {
    this.editMode = EditMode.EDIT;
    this.addValue = '';
  }

}
