import { Injectable } from "@angular/core";

/*
basename: "promotiontour_karten_verkaufsstart-5.jpg"
created: 1569070624
description: ""
ext: "jpg"
filesize: 355279
filesizeStr: "347 kB"
modified: 1569070624
name: "promotiontour_karten_verkaufsstart-5.jpg"
page_id: 5056
*/

export class ApiFile {
  constructor(
    public created: Date = new Date(),
    public modified: Date = new Date(),
    public description: string = '',
    public ext: string = '',
    public filesize: number = 0,
    public filesizeStr: string = '',
    public name: string = '',
    public basename: string = '',
    public page_id: number = 0
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class ApiFileAdapter {
  adapt(item: any): ApiFile {
    return new ApiFile(
        item.created, 
        item.modified, 
        item.description, 
        item.ext, 
        item.filesize,
        item.filesizeStr,
        item.name,
        item.basename,
        item.page_id
    );
  }
}