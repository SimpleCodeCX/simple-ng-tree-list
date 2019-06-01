import { NodeStatus, TreeModel } from './TreeType';

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

