import { TreeModel } from '../components/tree-list/TreeType';
export const DATALIST: TreeModel[] = [
  {
    name: '食物',
    selected: true,
    display: true,
    children: [
      {
        name: '水果',
        display: true,
        children: [
          { name: '苹果', selected: true, },
          { name: '香蕉', selected: true, },
          { name: '草莓', selected: true, }
        ]
      },
      {
        name: '蔬菜',
        display: true,
        children: [
          { name: '芹菜' },
          { name: '韭菜' },
          { name: '白菜' }
        ]
      },
      { name: '肉' },
    ]
  },
  {
    name: '动物',
    display: false,
    children: [
      { name: '小猫' },
      { name: '小狗' },
      { name: '小兔' }
    ]
  },
  {
    name: '昆虫'
  }
];