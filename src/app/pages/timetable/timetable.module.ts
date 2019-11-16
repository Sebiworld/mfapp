import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { TimetablePage } from './timetable.page';
import { EventTileComponent } from './event-tile/event-tile.component';

const routes: Routes = [
  {
    path: '',
    component: TimetablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [TimetablePage, EventTileComponent]
})
export class TimetablePageModule {}
