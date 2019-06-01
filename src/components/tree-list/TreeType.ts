
export interface TreeModel {
  name: string;
  selected?: boolean;
  display?: boolean;
  children?: TreeModel[];
}