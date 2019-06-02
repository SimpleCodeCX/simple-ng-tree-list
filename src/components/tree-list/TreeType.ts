/**
 * 定义每个节点 checkbox 的三种状态
 */
export enum NodeStatus {
  BLACK = 1, // 未勾选状态
  FILL = 2, // 选中：所有子节点都为勾选状态
  SOME = 3 // 中间选择状态：部分子节点为勾选状态
}

/**
 * 定义编辑模式 
 */
export enum EditMode {
  EDIT = 'edit', // 编辑模式
  ADD = 'add', // 添加模式
  DELETE = 'delete', // 删除模式
  HIDDEN = 'hiddle', // 非编辑模式
}

export interface TreeModel {
  name: string;
  selected?: boolean;
  display?: boolean;
  status?: NodeStatus;
  children?: TreeModel[];
  parent?: TreeModel;
  key?: number;
  editMode?: EditMode;
}