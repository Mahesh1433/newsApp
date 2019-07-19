import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Routes } from '@angular/router';
import { NewsCategoeryPage } from './news-categoery/news-categoery.page';
import PouchDB from 'pouchdb';

const routes: Routes = [
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


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  data: any;
  db: any;
  remote: any;
  isLoading = false;
  
  constructor(
    public loadingController: LoadingController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.loadData();
    this.initializeApp();
   // this.openDetailsWithState()

   
  }
  async loadData(){
  const loading = await this.loadingController.create({
   
    message: `<img height = "50" width="50" src="/assets/loading.gif">`,
    spinner: null,
    cssClass:'custom-loader-class'
   
    
  });
  await loading.present();
  
  this.db = new PouchDB('ubuntudb');
  this.remote = new PouchDB('http://ec2-18-208-182-52.compute-1.amazonaws.com:5984/ubuntudb');

 //  let options = {
 //    live: true,
 //    retry: true,
 //    continuous: true
 //  };
 
  //this.db.sync(this.remote, options);
  this.remote.replicate.to(this.db).on('complete', function () {
   
  
   console.log("data replaction done : ");
   loading.dismiss();
  }).on('error', function (err) {
    console.log("data replaction eroor"+err);
    // boo, something went wrong!
  });
 
}
  // async present() {
  //   this.isLoading = true;
  //   return await this.loadingController.create({
  //     duration: 5000,
  //   }).then(a => {
  //     a.present().then(() => {
  //       console.log('presented');
  //       if (!this.isLoading) {
  //         a.dismiss().then(() => console.log('abort presenting'));
  //       }
  //     });
  //   });
  // }

  // async dismiss() {
  //   this.isLoading = false;
  //   return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  // }
  doRefresh(event) {
    // console.log('Begin async operation');
 
     setTimeout(() => {
      // console.log('Async operation has ended');
       event.target.complete();
     }, 2000);
   }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
  }
}
