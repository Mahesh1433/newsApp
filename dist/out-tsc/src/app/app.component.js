import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NewsCategoeryPage } from './news-categoery/news-categoery.page';
var routes = [
    {
        path: 'tabs',
        component: NewsCategoeryPage,
        children: [
            {
                path: 'schedule',
                children: [
                    {
                        path: '',
                        loadChildren: '../schedule/schedule.module#ScheduleModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/tabs/schedule',
                pathMatch: 'full'
            }
        ]
    }
];
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.initializeApp();
        // this.openDetailsWithState()
    }
    AppComponent.prototype.doRefresh = function (event) {
        // console.log('Begin async operation');
        setTimeout(function () {
            // console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map