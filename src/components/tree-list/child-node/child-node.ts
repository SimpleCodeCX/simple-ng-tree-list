import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { TreeModel, NodeStatus } from '../TreeType';

let UNIQUE_COUNT = 0;
enum EditMode {
  NORMAL = 'normal',
  ADD = 'add',
  DELETE = 'delete'
}
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

  addValue: string = '';

  // 编辑模式 normal | edit
  editMode: EditMode = EditMode.NORMAL;

  @ViewChild('editBox', { read: ElementRef })
  editBox: ElementRef;

  constructor(private renderer: Renderer2, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.parent && (this.tree.parent = this.parent);
    this.tree.key = UNIQUE_COUNT;
    setTimeout(() => {
      this.renderParentNodeStatus(this.tree);
    }, 0);

  }

  ngOnDestroy() {
    this.tree = null;
  }

  /**
   * 点击复选框
   */
  checkboxClick(e) {
    if (e.target.checked) {
      this.renderSelected(this.tree, true);
      this.tree.parent && this.renderParentNodeStatus(this.tree);
    }
    else {
      this.renderSelected(this.tree, false);
      this.tree.parent && this.renderParentNodeStatus(this.tree);
    }
  }

  /**
   * 折叠或展开
   */
  flod() {
    this.tree.display = !this.tree.display;
  }

  /**
   * 渲染当前节点以及所有子节点 checkbox 样式
   * isSelected:true,设置当前节点以及所有子节点为勾选状态
   * isSelected:false,设置当前节点以及所有子节点为未勾选状态
   */
  renderSelected(node: TreeModel, isSelected: boolean) {
    if (isSelected) {
      node.status = NodeStatus.FILL;
      node.selected = true;
    } else {
      node.status = NodeStatus.BLACK;
      node.selected = false;
    }
    node.children && node.children.forEach((node: TreeModel) => this.renderSelected(node, isSelected));
  }

  /**
   * 递归渲染父节点 checkbox 样式
   */
  renderParentNodeStatus(parent: TreeModel) {
    parent.children && parent.children.forEach((node: TreeModel) => {
      const index = parent.children.findIndex((node: TreeModel) => node.selected);
      if (index === -1) {
        parent.selected = false;
        parent.status = NodeStatus.BLACK;
      } else {
        parent.status = NodeStatus.SOME;
        parent.selected = false;
        const isFill = parent.children.every((node: TreeModel) => node.selected === true);
        if (isFill) {
          parent.selected = true;
          parent.status = NodeStatus.FILL;
        }
      }
    });
    parent.parent && this.renderParentNodeStatus(parent.parent);
  }

  /**
    * 点击鼠标右键
    */
  contextmenuClick(e) {
    this.renderer.removeClass(this.editBox.nativeElement, 'edit-box-hidden');
    return false;
  }

  /**
   * 取消编辑状态
   */
  cancelEdit() {
    this.editMode = EditMode.NORMAL;
    this.renderer.addClass(this.editBox.nativeElement, 'edit-box-hidden');
    this.addValue = '';
  }

  /**
   * 开启添加模式
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
   * 添加节点
   */
  addNode() {
    const newNole: TreeModel = {
      name: this.addValue || '未命名'
    }
    !this.tree.children && (this.tree.children = []);
    this.tree.children.push(newNole);
    this.tree.display = true;
    this.renderer.addClass(this.editBox.nativeElement, 'edit-box-hidden');
    this.addValue = '';
    this.editMode = EditMode.NORMAL;
  }

  /**
   * 删除节点
   */
  deleteNode() {
    const index = this.tree.parent.children.findIndex((node: TreeModel) => node === this.tree);
    this.tree.parent.children.splice(index, 1);
    this.renderParentNodeStatus(this.tree);
  }

}
