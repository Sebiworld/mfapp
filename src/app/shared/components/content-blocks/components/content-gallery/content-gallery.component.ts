import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ContentGallery } from '@app/models/content/content-gallery.model';
import Masonry from 'masonry-layout';
import { ModalController } from '@ionic/angular';
import { ImageModalComponent } from '@app/shared/components/image-modal/image-modal.component';
import { ApiImage } from '@app/models/api-image';

@Component({
  selector: 'app-content-gallery',
  templateUrl: './content-gallery.component.html',
  styleUrls: ['./content-gallery.component.scss'],
})
export class ContentGalleryComponent implements OnInit, AfterViewInit {

  @ViewChild('galleryitems', { static: true }) galleryElement: ElementRef;

  @Input()
  private data: ContentGallery;

  private gridInstance: Masonry;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log("gallery data: ", this.data);

    this.gridInstance = new Masonry(this.galleryElement.nativeElement, {
      itemSelector: ".gallery-item",
      columnWidth: ".gallery-sizer",
      percentPosition: true,
    });
  }

  ngAfterViewInit() {
    this.gridInstance.reloadItems();
  }

  public getImages() {
    return this.data.images;
  }

  public refreshView(e: Event) {
    this.gridInstance.layout();
  }

  async presentModal(image: ApiImage) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        image: image,
        gallery: this.getImages()
      }
    });
    return await modal.present();
  }

}
