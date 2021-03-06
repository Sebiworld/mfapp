import { Component, OnInit, Input } from "@angular/core";
import { ContentBlock } from 'src/app/models/content/content-block.model';

@Component({
  selector: 'app-content-blocks',
  templateUrl: './content-blocks.component.html',
  styleUrls: ['./content-blocks.component.scss']
})
export class ContentBlocksComponent implements OnInit {

  private _contents; // private property _item

  get contents(): Array<ContentBlock> {
    return this._contents;
  }

  @Input()
  set contents(val: Array<ContentBlock>) {
    this._contents = val;
    console.log("contents: ", this._contents);
  }

  constructor() { }

  ngOnInit() {
    // console.log("Contents: ", this.contents);
  }

}
