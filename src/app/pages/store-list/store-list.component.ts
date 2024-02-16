import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {ParameterService} from '../../service/parameter.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  shopList = [];
  primiumShop = [];
  pageNumber = 0;
  localeValue = null;
  localeData = [];
  cleaningSelect = null;
  cleaningData = ['입주청소', '이사청소', '상가/사무실청소', '제품청소', '정기/특수청소'];

  constructor(private hs: HttpService,
              private router: Router,
              private ps: ParameterService) {
    document.documentElement.scrollTop = 0;

    this.hs.httpPostExample('selectLocale.do', null).then((data: any) => {
      data.forEach((d) => {
        this.localeData.push(d.id);
      });
    });
  }

  ngOnInit() {
    this.openShop();
  }

  openShop() {
    let locale = '';
    let cleaning = '';
    const startPage = this.pageNumber * 10;
    const endPage = (this.pageNumber * 10) + 9;
    if (this.localeValue !== '거주지') {
      locale = this.localeValue;
    }
    if (this.cleaningSelect !== '청소종류') {
      cleaning = this.cleaningSelect;

      if (cleaning === '정기/특수청소') {
        cleaning = '기타';
      }
      if (cleaning !== null) {
        cleaning = cleaning.replace('청소', '');
      }
    }

    const params = {
      localeData: locale,
      cleaningData: cleaning,
      sPage: startPage,
      ePage: endPage
    };

    this.hs.httpPostExample('selectPrimiumShopList.do', params).then((data: any) => {
      data.forEach((d) => {
        if (d.SEQ) {
          const potSeq = d.SEQ.split(',');
          const potImg = d.MAIN_IMG.split(',');
          const potTitle = d.TITLE.split(',');
          const potSubTitle = d.SUB_TITLE.split(',');
          const potData = [];
          potSeq.forEach((d2, i) => {
            potData.push({seq: d2, img: potImg[i], title: potTitle[i], subTitle: potSubTitle[i]});
          });
          d.POT_DATA = potData;
        } else {
          d.POT_DATA = [];
        }
        if (d.SHOP_BADGE) {
          d.SHOP_BADGE = d.SHOP_BADGE.split(',');
        } else {
          d.SHOP_BADGE = [];
        }
        d.SHOP_TAG = d.SHOP_TAG.split(' ');
      });
      this.primiumShop = data;
    });

    this.hs.httpPostExample('selectShopList.do', params).then((data: any) => {
      this.shopList = data;
    });
    this.pageNumber = this.pageNumber + 1;
  }

  openScrollShop() {
    let locale = '';
    let cleaning = '';
    const startPage = this.pageNumber * 10;
    const endPage = (this.pageNumber * 10) + 9;
    if (this.localeValue !== '거주지') {
      locale = this.localeValue;
    }
    if (this.cleaningSelect !== '청소종류') {
      cleaning = this.cleaningSelect;
    }

    const params = {
      localeData: locale,
      cleaningData: cleaning,
      sPage: startPage,
      ePage: endPage
    };

    this.hs.httpPostExample('selectShopList.do', params).then((data: any) => {

      this.shopList = this.shopList.concat(data);
    });
    this.pageNumber = this.pageNumber + 1;
  }

  onScroll() {
    this.openScrollShop();
  }

  locale() {
    this.pageNumber = 0;
    this.shopList = [];
    this.openShop();
  }

  cleaning(selected) {
    this.cleaningSelect = selected;
    this.pageNumber = 0;
    this.shopList = [];
    this.openShop();
  }

  detailShop(data) {
    this.router.navigate(['/detailShop'], {queryParams: {seq: data.SHOP_SEQ}});
  }
}
