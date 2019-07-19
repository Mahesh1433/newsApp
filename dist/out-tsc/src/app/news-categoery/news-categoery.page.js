import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SyncDbService } from '../sync-db.service';
var NewsCategoeryPage = /** @class */ (function () {
    function NewsCategoeryPage(syncService, router, loadingController, api) {
        // var localDB = new PouchDB('newsdb');
        // var remoteDB = new PouchDB('http://localhost:5984/newsdb');
        this.syncService = syncService;
        this.router = router;
        this.loadingController = loadingController;
        this.api = api;
        this.hasData = false;
        this.objectKeys = Object.keys;
        this.items = {};
        // localDB.replicate.to(remoteDB);
        // localDB.replicate.from(remoteDB);
        // localDB.get("5b41404d247fe505fe9ce488eb012cee").then(function () {
        //   return localDB.allDocs({include_docs: true});
        // }).then(function (response) {
        //   console.log(response);
        //   console.log(response.rows[0].doc);
        //   this.items = response.rows[0].doc;
        // }).catch(function (err) {
        //   console.log(err);
        // });
    }
    NewsCategoeryPage.prototype.doRefresh = function (event) {
        // console.log('Begin async operation');
        setTimeout(function () {
            // console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    // async getNews() {
    //   const loading = await this.loadingController.create({
    //     message: 'Please wait...',
    //     spinner: 'crescent',
    //     duration: 3500
    //   });
    //   await loading.present();
    //   await this.api.getNewsService()
    //     .subscribe(res => {
    //       console.log(" News response  "+res.Entertainment);
    //       this.entertainment = res.Entertainment;
    //       this.politics = res.Politics;
    //       this.business = res.Business;
    //       this.cricket = res.Cricket;
    //       this.technology = res.Technology;
    //       this.items = res;
    //       this.x = res;
    //     //  console.log("In News By Category "+this.entertainment.heading);
    //     //   for(this.x in res) {
    //     //     this.categoery = this.x;
    //     //          console.log("Data in Object : "+this.x )
    //     // }
    //       // for (this.categoery in res) {
    //       //   var sub_array = [];
    //       //   this.categoery  = sub_array.push(res);
    //       //   // console.log("Categoery : "+sub_array)
    //       //   // console.log("Categoery : "+typeof(res))
    //       //   // console.log("Object Categoery : "+ Object.keys(this.categoery));
    //       // }
    //       loading.dismiss();
    //     }, err => {
    //       console.log(err);
    //       loading.dismiss();
    //     });
    // }
    NewsCategoeryPage.prototype.getNewsPouch = function () {
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
                            _this.items = _this.todos[0];
                            //this.x = this.todos[0];
                            // console.log(this.todos[0]);
                            // this.getNews();
                            _this.hasData = true;
                            loading.dismiss();
                        }, function (err) {
                            console.log(err);
                            _this.hasData = false;
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsCategoeryPage.prototype.getNewsByCategoery = function (categoery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, headline, navigationExtras;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...',
                            spinner: 'lines',
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        headline = this.x.Entertainment.heading;
                        navigationExtras = {
                            state: {
                                categoery: categoery,
                            }
                        };
                        loading.dismiss();
                        //console.log("natigate to next");
                        this.router.navigate(['news-by-categoery'], navigationExtras);
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsCategoeryPage.prototype.ngOnInit = function () {
        //this.getNewsPouch();
        this.getNewsPouch();
    };
    NewsCategoeryPage = tslib_1.__decorate([
        Component({
            selector: 'app-news-categoery',
            templateUrl: './news-categoery.page.html',
            styleUrls: ['./news-categoery.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SyncDbService, Router, LoadingController, NewsService])
    ], NewsCategoeryPage);
    return NewsCategoeryPage;
}());
export { NewsCategoeryPage };
//# sourceMappingURL=news-categoery.page.js.map