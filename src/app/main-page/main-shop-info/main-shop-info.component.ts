import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-shop-info',
  templateUrl: './main-shop-info.component.html',
  styleUrls: ['./main-shop-info.component.scss']
})
export class MainShopInfoComponent implements OnInit {

  shopData;
  changeCss = false;

  constructor(private hs: HttpService,
              private router: Router) {
    this.hs.httpPostExample('selectShopMain.do', null).then((data: any) => {

      data.forEach((d) => {
        d.SHOP_BADGE = d.SHOP_BADGE.split(',');
        d.SHOP_TAG = d.SHOP_TAG.split(' ');
      });
      this.shopData = data;
    });
  }

  ngOnInit() {
  }

  shopDetailPage(event) {
    this.router.navigate(['/detailShop'], {queryParams: {seq: event.SHOP_SEQ}});
  }


  onIntersection(data) {
    data.forEach((d) => {
      if (d.isIntersecting === true && this.changeCss === false) {
        this.changeCss = true;
      }
    });
  }
}
