import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewsCategoeryPage } from './news-categoery.page';
var routes = [
    {
        path: '',
        component: NewsCategoeryPage
    }
];
var NewsCategoeryPageModule = /** @class */ (function () {
    function NewsCategoeryPageModule() {
    }
    NewsCategoeryPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NewsCategoeryPage]
        })
    ], NewsCategoeryPageModule);
    return NewsCategoeryPageModule;
}());
export { NewsCategoeryPageModule };
//# sourceMappingURL=news-categoery.module.js.map