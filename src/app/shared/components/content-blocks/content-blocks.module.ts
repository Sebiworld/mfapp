import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import * as fromComponents from './components';
import { ContentBlocksComponent } from './content-blocks.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        LazyLoadImageModule
    ],
    declarations: [
        ...fromComponents.components,
        ContentBlocksComponent
    ],
    exports: [
        ...fromComponents.components,
        ContentBlocksComponent
    ]
})
export class ContentBlocksModule { }
