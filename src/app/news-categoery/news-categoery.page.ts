import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import PouchDB from 'pouchdb';
import { SyncDbService } from '../sync-db.service'

@Component({
  selector: 'app-news-categoery',
  templateUrl: './news-categoery.page.html',
  styleUrls: ['./news-categoery.page.scss'],
})
export class NewsCategoeryPage implements OnInit {

  entertainment: any;
  hasData: boolean = false;
  politics: any;
  business: any;
  cricket: any;
  technology: any;
  todos:any;
  x : any;
  categoery: any;
  objectKeys = Object.keys;
  items = {};

  constructor( public syncService: SyncDbService, private router: Router, public loadingController: LoadingController, public api: NewsService,) { 
    
    // var localDB = new PouchDB('newsdb');
    // var remoteDB = new PouchDB('http://localhost:5984/newsdb');

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

  
  doRefresh(event) {
   // console.log('Begin async operation');
   window.location.reload();
   
  }
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






  async getNewsPouch() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',
      duration: 5000
    });
    await loading.present();
   // await this.api.getNewsService()
        
    this.syncService.getTodos().then((data) => {
      loading.dismiss();
      this.todos = data;
      this.items = this.todos[0];

      //this.x = this.todos[0];
     // console.log(this.todos[0]);
    

   // this.getNews();
  
   
   this.hasData = true;
      
      }, err => {
        console.log(err);
        this.hasData = false;
        loading.dismiss();
     
    });
  }



  async getNewsByCategoery(categoery){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'lines',
      
    });
    await loading.present();
//console.log("Get Categoery :"+headline);

let navigationExtras: NavigationExtras = {
  state: {
   
    categoery:categoery,
  
  }
};
loading.dismiss();

 //console.log("natigate to next");
this.router.navigate(['news-by-categoery'], navigationExtras);

  }



  ngOnInit() {
  //this.getNewsPouch();
 // this.getNewsPouch();

}
}
