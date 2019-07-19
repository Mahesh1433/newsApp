import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  // {
  //   path: 'tabs',
  //   component: TabsPage,
    
  //   children:[
  //     { path: 'tab1',
  //      loadChildren: '../news-categoery/news-categoery.module#NewsCategoeryPageModule' },
       
       
  //     { path: 'tab3',
  //      loadChildren: '../tab3/tab3.module#Tab3PageModule' },
     
  //      { path: 'tab2',
  //      loadChildren: '../jagran-news/jagran-news.module#JagranNewsPageModule' },
  // ]
  // },
  //  {
  //   path:'',
  //   redirectTo:'/tabs/tab1',
  //   pathMatch:'full'
  // }


  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'tab1',
          children:
            [
              {
                path: '',
                loadChildren: '../news-categoery/news-categoery.module#NewsCategoeryPageModule'
              }
            ]
        },
        {
          path: 'tab2',
          children:
            [
              {
                path: '',
                loadChildren: '../jagran-news/jagran-news.module#JagranNewsPageModule'
              }
            ]
        },
        {
          path: 'tab3',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/tab3.module#Tab3PageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/tab1',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
