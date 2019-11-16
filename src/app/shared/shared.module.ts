import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MomentModule } from 'ngx-moment';
import 'moment/locale/de';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as fromComponents from './components';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    MomentModule,
    NgProgressModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    ...fromComponents.components,
    MomentModule,
    NgProgressModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class SharedModule { }
