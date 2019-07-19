import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsCategoeryPage } from './news-categoery.page';

const routes: Routes = [
  {
    path: '',
    component: NewsCategoeryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsCategoeryPage]
})
export class NewsCategoeryPageModule {}
