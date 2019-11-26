import { Injectable } from "@angular/core";
import { ApiImage } from './api-image';
import { ContentBlock } from './content/content-block.model';
import { ApiPage } from './api-page.model';

/*
authors: ["Wolfgang Sauer"]
color: "3D2712"
contents: (2) [{…}, {…}]
created: 1569067699
datetime_from: 1569067680
httpUrl: "https://musical-fabrik.local/projekte/der-medicus/aktuelles/der-kartenverkauf-hat-begonnen/"
id: 5054
intro: "Heute morgen begann der Kartenverkauf für unser aktuelles Musical „Der Medicus“. Gegen 7.00 Uhr standen die ersten Musical-Liebhaber vor dem Ticketbüro der Flora Westfalica, um die begehrten Karten zu ergattern."
isProjectPage: true
main_image: {basename: "promotiontour_karten_verkaufsstart-5-1.jpg", name: "promotiontour_karten_verkaufsstart-5-1.jpg", description: "", created: 1569070624, modified: 1569070624, …}
modified: 1572966781
name: "der-kartenverkauf-hat-begonnen"
project: {id: 3478, name: "der-medicus", title: "Der Medicus", created: 1530812595, modified: 1572966740, …}
tags: (2) [{…}, {…}]
template: {id: 63, name: "article", label: "Beitrag"}
title: "Der Kartenverkauf hat begonnen"
url: "/projekte/der-medicus/aktuelles/der-kartenverkauf-hat-begonnen/"
*/

export class Article extends ApiPage{
  public authorsString?: string;
  
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public template: Object,
    public created: Date,
    public modified: Date,
    public title: string,
    public project: ApiPage,
    public datetime_from: Date,
    public main_image: ApiImage,
    public color: string = 'FC8F00',
    public intro: string = '',
    public contents: ContentBlock[] = [],
    public authors: string[] = [],
    public tags: ApiPage[] = [],
    public detailsLoaded: Boolean = false
  ) {
    super(id, name, url, template, created, modified, title);
  }
}

@Injectable({
  providedIn: "root"
})
export class ArticleAdapter {
  adapt(item: any): Article {
    return new Article(
        item.id, 
        item.name, 
        item.url, 
        item.template, 
        new Date(item.created),
        new Date(item.modified),
        item.title,
        item.project,
        item.datetime_from,
        item.main_image,
        item.color,
        item.intro,
        item.contents,
        item.authors,
        item.tags,
        item.detailsLoaded
    );
  }
}