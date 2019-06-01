export enum NodeStatus {
  BLACK = 1,
  FILL = 2,
  SOME = 3
}
export interface TreeModel {
  name: string;
  selected?: boolean;
  display?: boolean;
  status?: NodeStatus;
  children?: TreeModel[];
}