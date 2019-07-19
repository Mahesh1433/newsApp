import { Component, ViewChild, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SyncDbService } from '../sync-db.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import PouchDB from 'pouchdb';
@Component({
  selector: 'app-news-by-categoery',
  templateUrl: './news-by-categoery.page.html',
  styleUrls: ['./news-by-categoery.page.scss'],
})
export class NewsByCategoeryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  count = 1;
  news: any;
  todos: any;
  categoery: any;
  endslice = 5;
  startslice = 0;

  data: any;
  db: any;
  remote: any;

  constructor(public toastController: ToastController, public syncService: SyncDbService, private route: ActivatedRoute, private router: Router, public loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        // this.newsHeading = this.router.getCurrentNavigation().extras.state.categoery;
        // this.newsDetail = this.router.getCurrentNavigation().extras.state.news.de;
        // this.newsHeading = this.router.getCurrentNavigation().extras.state.news.heading;
        // this.news = this.router.getCurrentNavigation().extras.state.news;
        //console.log(this.news)
        this.categoery = this.router.getCurrentNavigation().extras.state.categoery;

      }
    });
    //console.log("data in newsBy : "+this.news);

  }
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
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
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };
  async presentToast(event) {
    const toast = await this.toastController.create({
      message: 'Loading news...',
      duration: 100,

    });
    toast.present();
    this.endslice = this.endslice + 5;

  }
 

  async doRefresh(event) {
    const toast = await this.toastController.create({
      message: 'News up-to date.',
      duration: 200,
      position: "middle"
    });
   

      event.target.complete();
      toast.present();
      console.log("data replaction done in news : ");

  
  }

  async getNewsPouch(categoery) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',

    });
    await loading.present();
    // await this.api.getNewsService()

    this.syncService.getTodos().then((data) => {
      this.todos = data;
      //this.todos = this.todos[0].Business;
      this.todos = this.todos[0][categoery];
      // this.news = data[categoery]

      //  console.log("this is the data : "+this.todos);


      // this.getNews();



      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();

    });
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      message: 'Please Wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    //  console.log('Loading dismissed!');
  }


  ngOnInit() {
    this.getNewsPouch(this.categoery);
    //   this.presentLoading();
  }


}
