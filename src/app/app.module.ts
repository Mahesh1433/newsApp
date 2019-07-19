import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsCategoeryPage } from './news-categoery/news-categoery.page';
import { SyncDbService } from './sync-db.service';
import { NewsByCategoeryPage } from './news-by-categoery/news-by-categoery.page';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
   
    
  ],
  imports: [BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SyncDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
