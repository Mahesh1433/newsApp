import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewsByCategoeryPage } from './news-by-categoery.page';
var routes = [
    {
        path: '',
        component: NewsByCategoeryPage
    }
];
var NewsByCategoeryPageModule = /** @class */ (function () {
    function NewsByCategoeryPageModule() {
    }
    NewsByCategoeryPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NewsByCategoeryPage]
        })
    ], NewsByCategoeryPageModule);
    return NewsByCategoeryPageModule;
}());
export { NewsByCategoeryPageModule };
//# sourceMappingURL=news-by-categoery.module.js.map