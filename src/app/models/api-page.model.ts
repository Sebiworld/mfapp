import { Injectable } from "@angular/core";

export class ApiPage {
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public template: Object,
    public created: Date,
    public modified: Date,
    public title: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class ApiPageAdapter {
  adapt(item: any): ApiPage {
    return new ApiPage(
        item.id, 
        item.name, 
        item.url, 
        item.template, 
        item.created,
        item.modified,
        item.title
    );
  }
}