import { Injectable } from "@angular/core";

export class ContentBlock {
  constructor(
    public title: string = '',
    public hide_title: boolean = false,
    public type: string = 'none',
    public classes: string = '',
    public depth: number = 0
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class ContentBlockAdapter {
  adapt(item: any): ContentBlock {
    return new ContentBlock(
        item.title, 
        item.hide_title, 
        item.type, 
        item.classes, 
        item.depth
    );
  }
}