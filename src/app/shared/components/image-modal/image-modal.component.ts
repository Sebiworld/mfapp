import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ContentGallery } from '@app/models/content/content-gallery.model';
import { ApiImage } from '@app/models/api-image';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit, AfterViewInit {

  @ViewChild('galleryitems', { static: true }) galleryElement: ElementRef;

  @Input()
  public image: ApiImage;

  @Input()
  public gallerydata: ContentGallery;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("image data: ", this.image);
  }

  ngAfterViewInit() {
  }

  zoom(zoomIn: boolean){

  }

  close(){
    this.modalController.dismiss();
  }
}
