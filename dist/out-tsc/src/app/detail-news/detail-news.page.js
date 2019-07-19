import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
var DetailNewsPage = /** @class */ (function () {
    function DetailNewsPage(route, router) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.route.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.newsHeading = _this.router.getCurrentNavigation().extras.state.heading;
                _this.newsDetail = _this.router.getCurrentNavigation().extras.state.detail;
                _this.categoery = _this.router.getCurrentNavigation().extras.state.categoery;
                // console.log("in Detail : "+this.newsDetail);
                //console.log("in Heading : "+this.newsHeading);
            }
        });
    }
    DetailNewsPage.prototype.ngOnInit = function () {
    };
    DetailNewsPage = tslib_1.__decorate([
        Component({
            selector: 'app-detail-news',
            templateUrl: './detail-news.page.html',
            styleUrls: ['./detail-news.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router])
    ], DetailNewsPage);
    return DetailNewsPage;
}());
export { DetailNewsPage };
//# sourceMappingURL=detail-news.page.js.map