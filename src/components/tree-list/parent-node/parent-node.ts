import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TreeModel } from '../TreeType';

@Component({
  selector: 'parent-node',
  templateUrl: './parent-node.html',
  styleUrls: ['./parent-node.scss']
})
export class ParentNode implements OnInit, OnDestroy {

  @Input()
  public tree: TreeModel;

  @Input()
  public parent: TreeModel;

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() { }

}
