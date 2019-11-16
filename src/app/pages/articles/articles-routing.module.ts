
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesPage } from './components';
import { ArticlesDetailPage } from './components';

const routes: Routes = [
    {
        path: '',
        component: ArticlesPage
    },
    {
        path: ':id',
        component: ArticlesDetailPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticlesRoutingModule { }