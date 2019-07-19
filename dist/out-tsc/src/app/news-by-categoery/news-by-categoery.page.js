import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SyncDbService } from '../sync-db.service';
var NewsByCategoeryPage = /** @class */ (function () {
    function NewsByCategoeryPage(syncService, route, router, loadingController) {
        var _this = this;
        this.syncService = syncService;
        this.route = route;
        this.router = router;
        this.loadingController = loadingController;
        this.count = 1;
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                // this.newsHeading = this.router.getCurrentNavigation().extras.state.categoery;
                // this.newsDetail = this.router.getCurrentNavigation().extras.state.news.de;
                // this.newsHeading = this.router.getCurrentNavigation().extras.state.news.heading;
                // this.news = this.router.getCurrentNavigation().extras.state.news;
                //console.log(this.news)
                _this.categoery = _this.router.getCurrentNavigation().extras.state.categoery;
            }
        });
        //console.log("data in newsBy : "+this.news);
    }
    NewsByCategoeryPage.prototype.getNewsPouch = function (categoery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...',
                            spinner: 'lines',
                            duration: 5000
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        // await this.api.getNewsService()
                        this.syncService.getTodos().then(function (data) {
                            _this.todos = data;
                            //this.todos = this.todos[0].Business;
                            _this.todos = _this.todos[0][categoery];
                            // this.news = data[categoery]
                            //  console.log("this is the data : "+this.todos);
                            // this.getNews();
                            loading.dismiss();
                        }, function (err) {
                            console.log(err);
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsByCategoeryPage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, _a, role, data;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            spinner: 'lines',
                            message: 'Please Wait...',
                            duration: 2000
                        })];
                    case 1:
                        loading = _b.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, loading.onDidDismiss()];
                    case 3:
                        _a = _b.sent(), role = _a.role, data = _a.data;
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsByCategoeryPage.prototype.ngOnInit = function () {
        this.getNewsPouch(this.categoery);
        //   this.presentLoading();
    };
    NewsByCategoeryPage = tslib_1.__decorate([
        Component({
            selector: 'app-news-by-categoery',
            templateUrl: './news-by-categoery.page.html',
            styleUrls: ['./news-by-categoery.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SyncDbService, ActivatedRoute, Router, LoadingController])
    ], NewsByCategoeryPage);
    return NewsByCategoeryPage;
}());
export { NewsByCategoeryPage };
//# sourceMappingURL=news-by-categoery.page.js.map