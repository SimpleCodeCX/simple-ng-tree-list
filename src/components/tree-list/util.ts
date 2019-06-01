import { NodeStatus } from './TreeType';

export function renderNodeStatus(tree) {
  tree && tree.children && tree.children.forEach(node => {
    node.children && renderNodeStatus(node);
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

export function deleteSelected(tree) {
  const deleteNames = [];
  tree.children && tree.children.forEach((node) => {
    if (node.selected) {
      deleteNames.push(node.name);
    } else {
      deleteSelected(node);
    }
  });
  deleteNames.forEach(name => tree.children.splice(tree.children.findIndex(n => n.name === name), 1));
}

