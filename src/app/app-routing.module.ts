import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  // { path: '', loadChildren: './news-categoery/news-categoery.module#NewsCategoeryPageModule' },
   { path: 'jagran-news', loadChildren: './detail-news/detail-news.module#DetailNewsPageModule' },
   { path: 'detail-news', loadChildren: './detail-news/detail-news.module#DetailNewsPageModule' },
   { path: 'news-categoery', loadChildren: './news-by-categoery/news-by-categoery.module#NewsByCategoeryPageModule' },
   { path: 'news-by-categoery', loadChildren: './news-by-categoery/news-by-categoery.module#NewsByCategoeryPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  // { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  // { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}