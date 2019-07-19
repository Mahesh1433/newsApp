import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { SyncDbService } from '../sync-db.service';
var JagranNewsPage = /** @class */ (function () {
    function JagranNewsPage(syncService, router, api, loadingController) {
        this.syncService = syncService;
        this.router = router;
        this.api = api;
        this.loadingController = loadingController;
        this.objectKeys = Object.keys;
        this.items = {};
        this.slideOpts = {
            on: {
                beforeInit: function () {
                    var swiper = this;
                    swiper.classNames.push(swiper.params.containerModifierClass + "flip");
                    swiper.classNames.push(swiper.params.containerModifierClass + "3d");
                    var overwriteParams = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: true,
                        spaceBetween: 0,
                        virtualTranslate: true,
                    };
                    swiper.params = Object.assign(swiper.params, overwriteParams);
                    swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
                },
                setTranslate: function () {
                    var swiper = this;
                    var $ = swiper.$, slides = swiper.slides, rtl = swiper.rtlTranslate;
                    for (var i = 0; i < slides.length; i += 1) {
                        var $slideEl = slides.eq(i);
                        var progress = $slideEl[0].progress;
                        if (swiper.params.flipEffect.limitRotation) {
                            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                        }
                        var offset$$1 = $slideEl[0].swiperSlideOffset;
                        var rotate = -180 * progress;
                        var rotateY = rotate;
                        var rotateX = 0;
                        var tx = -offset$$1;
                        var ty = 0;
                        if (!swiper.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (rtl) {
                            rotateY = -rotateY;
                        }
                        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
                        if (swiper.params.flipEffect.slideShadows) {
                            // Set shadows
                            var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                            var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = swiper.$("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>");
                                $slideEl.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = swiper.$("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>");
                                $slideEl.append(shadowAfter);
                            }
                            if (shadowBefore.length)
                                shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length)
                                shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                        $slideEl
                            .transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
                    }
                },
                setTransition: function (duration) {
                    var swiper = this;
                    var slides = swiper.slides, activeIndex = swiper.activeIndex, $wrapperEl = swiper.$wrapperEl;
                    slides
                        .transition(duration)
                        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                        .transition(duration);
                    if (swiper.params.virtualTranslate && duration !== 0) {
                        var eventTriggered_1 = false;
                        // eslint-disable-next-line
                        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
                            if (eventTriggered_1)
                                return;
                            if (!swiper || swiper.destroyed)
                                return;
                            eventTriggered_1 = true;
                            swiper.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                            for (var i = 0; i < triggerEvents.length; i += 1) {
                                $wrapperEl.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            }
        };
    }
    JagranNewsPage.prototype.doRefresh = function (event) {
        // console.log('Begin async operation');
        setTimeout(function () {
            // console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    JagranNewsPage.prototype.openDetailsWithState = function (details, headings, categoery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, navigationExtras;
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
                        navigationExtras = {
                            state: {
                                heading: headings,
                                detail: details,
                                categoery: categoery
                            }
                        };
                        loading.dismiss();
                        // console.log("State Details : "+navigationExtras)
                        this.router.navigate(['detail-news'], navigationExtras);
                        return [2 /*return*/];
                }
            });
        });
    };
    JagranNewsPage.prototype.getNews = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please wait...',
                            spinner: 'crescent',
                            duration: 3500
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.api.getNewsService()
                                .subscribe(function (res) {
                                _this.breaking = res.Breaking;
                                //   this.entertainment = res.Entertainment;
                                //   this.politics = res.Politics;
                                //   this.business = res.Business;
                                //   this.sport = res.Sport;
                                //   this.technology = res.Technology;
                                //   //console.log(res.Technology);
                                // this.items = res;
                                //  // console.log(res);
                                // this.x = res;
                                // console.log(this.items);
                                //   for(this.x in res) {
                                //     this.categoery = this.x;
                                //          console.log("Data in Object : "+this.x )
                                // }
                                // for (this.categoery in res) {
                                //   var sub_array = [];
                                //   this.categoery  = sub_array.push(res);
                                //   // console.log("Categoery : "+sub_array)
                                //   // console.log("Categoery : "+typeof(res))
                                //   // console.log("Object Categoery : "+ Object.keys(this.categoery));
                                // }
                                loading.dismiss();
                            }, function (err) {
                                console.log(err);
                                loading.dismiss();
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JagranNewsPage.prototype.ngOnInit = function () {
        //   this.syncService.getTodos().then((data) => {
        //     this.todos = data;
        //     this.x = this.todos;
        //     console.log("data : "+this.todos);
        // });
        this.getNews();
    };
    JagranNewsPage = tslib_1.__decorate([
        Component({
            selector: 'app-jagran-news',
            templateUrl: './jagran-news.page.html',
            styleUrls: ['./jagran-news.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SyncDbService, Router, NewsService, LoadingController])
    ], JagranNewsPage);
    return JagranNewsPage;
}());
export { JagranNewsPage };
//# sourceMappingURL=jagran-news.page.js.map