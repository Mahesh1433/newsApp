import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetailNewsPage } from './detail-news.page';
var routes = [
    {
        path: '',
        component: DetailNewsPage
    }
];
var DetailNewsPageModule = /** @class */ (function () {
    function DetailNewsPageModule() {
    }
    DetailNewsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DetailNewsPage]
        })
    ], DetailNewsPageModule);
    return DetailNewsPageModule;
}());
export { DetailNewsPageModule };
//# sourceMappingURL=detail-news.module.js.map