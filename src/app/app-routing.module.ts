import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './news-categoery/news-categoery.module#NewsCategoeryPageModule' },
  { path: 'jagran-news', loadChildren: './jagran-news/jagran-news.module#JagranNewsPageModule' },
  { path: 'detail-news', loadChildren: './detail-news/detail-news.module#DetailNewsPageModule' },
  { path: 'news-categoery', loadChildren: './news-categoery/news-categoery.module#NewsCategoeryPageModule' },
  { path: 'news-by-categoery', loadChildren: './news-by-categoery/news-by-categoery.module#NewsByCategoeryPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
