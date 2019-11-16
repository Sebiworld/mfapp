import { Injectable } from "@angular/core";
import { ContentBlock } from './content-block.model';

export class ContentText extends ContentBlock{
  constructor(
    public title: string = '',
    public hide_title: boolean = false,
    public type: string = 'text',
    public classes: string = '',
    public depth: number = 0,
    public text: string = ''
  ) {
    super(title, hide_title, type, classes, depth);
  }
}

@Injectable({
  providedIn: "root"
})
export class ContentTextAdapter {
  adapt(item: any): ContentText {
    return new ContentText(
        item.title, 
        item.hide_title,
        'text',
        item.classes, 
        item.depth,
        item.text
    );
  }
}