import { NodeStatus, TreeModel, EditMode } from './TreeType';

/**
 * 初始化一棵树上的所有节点的初始化状态
 */
export function renderNodeStatus(tree: TreeModel) {
  tree && tree.children && tree.children.forEach((node: TreeModel) => {
    node.children && renderNodeStatus(node);
    const index = tree.children.findIndex((node: TreeModel) => node.selected);
    if (index === -1) {
      tree.selected = false;
      tree.status = NodeStatus.BLACK;
    } else {
      tree.status = NodeStatus.SOME;
      tree.selected = false;
      const isFill = tree.children.every((node: TreeModel) => node.selected === true);
      if (isFill) {
        tree.selected = true;
        tree.status = NodeStatus.FILL;
      }
    }
  });
}

/**
 * 删除一棵树上的所有勾选的节点
 */
export function deleteSelected(tree: TreeModel) {
  const deleteNames = [];
  tree.children && tree.children.forEach((node: TreeModel) => {
    if (node.selected) {
      deleteNames.push(node.name);
    } else {
      deleteSelected(node);
    }
  });
  deleteNames.forEach(name => tree.children.splice(tree.children.findIndex((n: TreeModel) => n.name === name), 1));
}

/**
 * 返回根节点
 */
export function findRootNode(tree: TreeModel) {
  let root = tree.parent ? findRootNode(tree.parent) : tree;
  return root;
}

/**
 * 初始化一颗树上所有的节点为非编辑模式
 */
export function setEditModeToHidden(tree: TreeModel) {
  tree.editMode = EditMode.HIDDEN;
  tree.children.forEach(node => {
    node.editMode = EditMode.HIDDEN;
    node.children && setEditModeToHidden(node);
  });
}

