import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MomentModule } from 'ngx-moment';
import 'moment/locale/de';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentBlocksModule } from './components/content-blocks/content-blocks.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import * as fromComponents from './components';
import { ImageModalComponent } from './components';

@NgModule({
  entryComponents: [
    ImageModalComponent
  ],
  declarations: [
    ...fromComponents.components
  ],
  imports: [
    CommonModule,
    MomentModule,
    NgProgressModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ContentBlocksModule,
    LazyLoadImageModule
  ],
  exports: [
    ...fromComponents.components,
    MomentModule,
    NgProgressModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ContentBlocksModule,
    LazyLoadImageModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
