import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
var routes = [
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
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: '../news-categoery/news-categoery.module#NewsCategoeryPageModule'
                    }
                ]
            },
            {
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: '../jagran-news/jagran-news.module#JagranNewsPageModule'
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
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
var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TabsPage]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());
export { TabsPageModule };
//# sourceMappingURL=tabs.module.js.map