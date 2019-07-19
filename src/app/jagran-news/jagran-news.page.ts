import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NewsService } from '../news.service';
import { Router, NavigationExtras } from '@angular/router';
import { SyncDbService } from '../sync-db.service'

@Component({
  selector: 'app-jagran-news',
  templateUrl: './jagran-news.page.html',
  styleUrls: ['./jagran-news.page.scss'],
})
export class JagranNewsPage implements OnInit {
  entertainment: any;
  politics: any;
  business: any;
  cricket: any;
  technology: any;
  todos: any;
  x : any;
  categoery: any;
  objectKeys = Object.keys;
  items = {};

  constructor( public syncService: SyncDbService, private router: Router, public api: NewsService, public loadingController: LoadingController) { }
  
  slideOpts = { on: { beforeInit() { const swiper = this; swiper.classNames.push(`${swiper.params.containerModifierClass}flip`); swiper.classNames.push(`${swiper.params.containerModifierClass}3d`); const overwriteParams = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: true, spaceBetween: 0, virtualTranslate: true, }; swiper.params = Object.assign(swiper.params, overwriteParams); swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams); }, setTranslate() { const swiper = this; const { $, slides, rtlTranslate: rtl } = swiper; for (let i = 0; i < slides.length; i += 1) { const $slideEl = slides.eq(i); let progress = $slideEl[0].progress; if (swiper.params.flipEffect.limitRotation) { progress = Math.max(Math.min($slideEl[0].progress, 1), -1); } const offset$$1 = $slideEl[0].swiperSlideOffset; const rotate = -180 * progress; let rotateY = rotate; let rotateX = 0; let tx = -offset$$1; let ty = 0; if (!swiper.isHorizontal()) { ty = tx; tx = 0; rotateX = -rotateY; rotateY = 0; } else if (rtl) { rotateY = -rotateY; } $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length; if (swiper.params.flipEffect.slideShadows) { // Set shadows 
    let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top'); let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom'); if (shadowBefore.length === 0) { shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`); $slideEl.append(shadowBefore); } if (shadowAfter.length === 0) { shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`); $slideEl.append(shadowAfter); } if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0); if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0); } $slideEl .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`); } }, setTransition(duration) { const swiper = this; const { slides, activeIndex, $wrapperEl } = swiper; slides .transition(duration) .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left') .transition(duration); if (swiper.params.virtualTranslate && duration !== 0) { let eventTriggered = false; // eslint-disable-next-line 
      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() { if (eventTriggered) return; if (!swiper || swiper.destroyed) return; eventTriggered = true; swiper.animating = false; const triggerEvents = ['webkitTransitionEnd', 'transitionend']; for (let i = 0; i < triggerEvents.length; i += 1) { $wrapperEl.trigger(triggerEvents[i]); } }); } } } };


  openDetailsWithState(details,headings) {

    // console.log("Click Details : "+details)
    let navigationExtras: NavigationExtras = {
      state: {
        heading: headings,
        detail: details

      }
      
    };
    // console.log("State Details : "+navigationExtras)
    this.router.navigate(['detail-news'], navigationExtras);
  }


  async getNews() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 3500
    });
    await loading.present();
    await this.api.getNewsService()
      .subscribe(res => {
      
        this.entertainment = res.Entertainment;
        this.politics = res.Politics;
        this.business = res.Business;
        this.cricket = res.Cricket;
        this.technology = res.Technology;
       
        this.items = res;
        this.x = res;
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
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
  ngOnInit() {


    this.syncService.getTodos().then((data) => {
      this.todos = data;
      console.log("data : "+this.todos);


  });
  this.getNews();
  
   
}

}
