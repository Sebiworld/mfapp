import { Injectable } from "@angular/core";
import { ApiImage } from '../api-image';
import { ContentBlock } from './content-block.model';

export class ContentGallery extends ContentBlock {
  constructor(
    public title: string = '',
    public hide_title: boolean = false,
    public type: string = 'gallery',
    public classes: string = '',
    public depth: number = 0,
    public description: string = '',
    public gallery_type: string = 'masonry',
    public images: Array<ApiImage>
  ) {
    super(title, hide_title, type, classes, depth);
  }
}

@Injectable({
  providedIn: "root"
})
export class ContentGalleryAdapter {
  adapt(item: any): ContentGallery {
    return new ContentGallery(
        item.title, 
        item.hide_title,
        'gallery',
        item.classes, 
        item.depth,
        item.description,
        item.gallery_type,
        item.images
    );
  }
}