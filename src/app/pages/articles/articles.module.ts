import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import * as fromComponents from './components';

import { SharedModule } from '@shared/shared.module';
import { ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ArticlesRoutingModule
  ],
  declarations: [fromComponents.components]
})
export class ArticlesPageModule { }
