/*
authors: ["Wolfgang Sauer"]
color: "3D2712"
contents: (2) [{…}, {…}]
created: 1569067699
datetime_from: 1569067680
httpUrl: "https://musical-fabrik.local/projekte/der-medicus/aktuelles/der-kartenverkauf-hat-begonnen/"
id: 5054
intro: "Heute morgen begann der Kartenverkauf für unser aktuelles Musical „Der Medicus“.
        Gegen 7.00 Uhr standen die ersten Musical-Liebhaber vor dem Ticketbüro der Flora Westfalica,
        um die begehrten Karten zu ergattern."
isProjectPage: true
main_image: {
  basename: "promotiontour_karten_verkaufsstart-5-1.jpg",
  name: "promotiontour_karten_verkaufsstart-5-1.jpg",
  description: "",
  created: 1569070624,
  modified: 1569070624,
  …
}
modified: 1572966781
name: "der-kartenverkauf-hat-begonnen"
project: {id: 3478, name: "der-medicus", title: "Der Medicus", created: 1530812595, modified: 1572966740, …}
tags: (2) [{…}, {…}]
template: {id: 63, name: "article", label: "Beitrag"}
title: "Der Kartenverkauf hat begonnen"
url: "/projekte/der-medicus/aktuelles/der-kartenverkauf-hat-begonnen/"
*/

import { ImageDto } from "@models/image-dto.model";
import { PageDto } from "./page-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";

export interface ArticlePageDto extends PageDto {
  datetime_from: number;
  main_image: ImageDto;
  intro: string;
  contents: ContentBlockDtoVariant[];
  authors: string[];
  tags: PageDto[];
  detailsLoaded: boolean;
}
