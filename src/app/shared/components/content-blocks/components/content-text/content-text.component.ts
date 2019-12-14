import { Component, OnInit, Input } from '@angular/core';
import { ContentText } from '@app/models/content/content-text.model';

@Component({
  selector: 'app-content-text',
  templateUrl: './content-text.component.html',
  styleUrls: ['./content-text.component.scss'],
})
export class ContentTextComponent implements OnInit {

  @Input()
  private data: ContentText;

  constructor() { }

  ngOnInit() {
    console.log("text data: ", this.data);
  }

}
