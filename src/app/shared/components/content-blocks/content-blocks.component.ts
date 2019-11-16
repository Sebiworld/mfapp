import { Component, OnInit, Input } from "@angular/core";
import { ContentBlock } from 'src/app/models/content/content-block.model';

@Component({
  selector: 'app-content-blocks',
  templateUrl: './content-blocks.component.html',
  styleUrls: ['./content-blocks.component.scss']
})
export class ContentBlocksComponent implements OnInit {

  @Input()
  private contents: Array<ContentBlock>;
  
  constructor() { }

  ngOnInit() {
    console.log("Contents: ", this.contents);
  }

}
