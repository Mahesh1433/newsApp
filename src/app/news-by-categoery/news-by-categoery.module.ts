import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsByCategoeryPage } from './news-by-categoery.page';

const routes: Routes = [
  {
    path: '',
    component: NewsByCategoeryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsByCategoeryPage]
})
export class NewsByCategoeryPageModule {}
