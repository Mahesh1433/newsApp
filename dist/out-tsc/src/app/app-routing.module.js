import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    // { path: '', loadChildren: './news-categoery/news-categoery.module#NewsCategoeryPageModule' },
    { path: 'jagran-news', loadChildren: './detail-news/detail-news.module#DetailNewsPageModule' },
    { path: 'detail-news', loadChildren: './detail-news/detail-news.module#DetailNewsPageModule' },
    { path: 'news-categoery', loadChildren: './news-by-categoery/news-by-categoery.module#NewsByCategoeryPageModule' },
    { path: 'news-by-categoery', loadChildren: './news-by-categoery/news-by-categoery.module#NewsByCategoeryPageModule' },
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map