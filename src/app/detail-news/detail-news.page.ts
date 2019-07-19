import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.page.html',
  styleUrls: ['./detail-news.page.scss'],
})
export class DetailNewsPage implements OnInit {
  newsHeading: any;
  newsDetail: any;
  categoery: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.newsHeading = this.router.getCurrentNavigation().extras.state.heading;
        this.newsDetail = this.router.getCurrentNavigation().extras.state.detail;
        this.categoery = this.router.getCurrentNavigation().extras.state.categoery;
       // console.log("in Detail : "+this.newsDetail);
        //console.log("in Heading : "+this.newsHeading);
      }
    });
  }
  ngOnInit() {
  }

}
