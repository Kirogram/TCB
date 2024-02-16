import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ParameterService} from '../../service/parameter.service';
import {Subscription} from 'rxjs';
import {Event, NavigationEnd, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAddComponent} from '../../modal/modal-add/modal-add.component';
import {ModalShopComponent} from '../../modal/modal-shop/modal-shop.component';
import {ToastService} from '../../modal/toast/toast-service';
import {ModalOrderComponent} from '../../modal/modal-order/modal-order.component';
import {Gtag} from 'angular-gtag';


@Component({
  selector: 'app-shop-price',
  templateUrl: './shop-price.component.html',
  styleUrls: ['./shop-price.component.scss']
})
export class ShopPriceComponent implements OnInit, OnDestroy {
  popup = false;
  shopDefaultList = [];
  shopList = [];
  priceSession;
  userLogin = false;
  userStatus = false;
  popupItem;
  choiceList;
  choicePopup = false;
  potPopup = false;
  shopPopup = false;
  potSeq;
  shopSeq;
  shopData;
  pageNumber = 0;
  sortNumber = 1;
  subscription: Subscription;
  closePopup = [];
  defaultPage = '';
  startKey = 10;
  endKey = 9;
  orderCount = 0;
  nightTime = false;

  constructor(private hs: HttpService,
              private router: Router,
              private ps: ParameterService,
              private toastService: ToastService,
              private modalService: NgbModal,
              private gtag: Gtag) {
    document.documentElement.scrollTop = 0;

    this.modalService.open(ModalOrderComponent);
    this.hs.httpPostExample('selectCleaningOption.do', null).then((data: any) => {
      if (data === null) {
        this.router.navigate(['/costRequest']);
      }

      const params = {pageName: '주문페이지', subName: data.title};
      this.hs.httpPostExample('pageHistory.do', params).then((data2: any) => {
      });
      this.priceSession = data;
      this.selectShopPrice();
    });
    this.hs.httpPostExample('sessionCheck.do', null).then((data: any) => {
      if (data.status === 'succ') {
        this.userStatus = true;
      }
    });

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const closeParams = event.url.split('=');
        if (event.url === '/shopPrice') {
          this.closePopup.forEach((d) => {
            this[d] = false;
          });
          this.closePopup = [];
          this.defaultPage = '';
        } else if (this.defaultPage !== '' && this.defaultPage !== closeParams[1]) {
          this[this.closePopup[this.closePopup.length - 1]] = false;
          this.closePopup.splice(this.closePopup.length - 1);
          this.closePopup.push(closeParams[1]);
          this.defaultPage = closeParams[1];
        } else {
          this.closePopup.push(closeParams[1]);
          this.defaultPage = closeParams[1];
        }
      }
    });

    const today = new Date();
    const hours = today.getHours();
    if (hours < 7) {
      this.nightTime = true;
    }

  }

  ngOnInit() {
  }


  historyBack(falseKey) {
    this[falseKey] = false;
    window.history.back();
  }

  setSort(data) {
    this.sortNumber = data;
    this.pageNumber = 0;
    this.shopList = [];
    this.startKey = this.startKey + 1;
    this.endKey = this.endKey + 1;
    this.selectShopPrice();
  }

  selectShopPrice() {

    const params = {
      title: this.priceSession.title,
      subTitle: this.priceSession.subTitle,
      price: this.priceSession.defaultOption.id,
      defaultOption: this.priceSession.defaultOption.name,
      locale: this.priceSession.localeOption.id,
      localeDetail: this.priceSession.localeDetailOption.id,
      orderDate: this.priceSession.date,
      sortNumber: this.sortNumber
    };

    this.hs.httpPostExample('selectShopPrice.do', params).then((data: any) => {
      data.forEach((d) => {
        if (d.SHOP_BADGE) {
          d.SHOP_BADGE = d.SHOP_BADGE.split(',');
        } else {
          d.SHOP_BADGE = [];
        }
        d.SHOP_TAG = d.SHOP_TAG.split(' ');

        if (d.POT_SEQ) {
          const potSeq = d.POT_SEQ.split(',');
          const potImg = d.POT_IMG.split(',');
          const potTitle = d.POT_TITLE.split(',');
          const potData = [];
          potSeq.forEach((d2, i) => {
            potData.push({seq: d2, img: potImg[i], title: potTitle[i]});
          });
          d.POT_DATA = potData;
        } else {
          d.POT_DATA = [];
        }
      });
      this.shopDefaultList = data;
      this.setShopListData();
    });
  }

  onScroll() {
    this.setShopListData();
  }

  setShopListData() {
    const startPage = this.pageNumber * this.startKey;
    const endPage = (this.pageNumber * this.startKey) + this.endKey;
    this.pageNumber = this.pageNumber + 1;

    for (let i = startPage; i <= endPage; i++) {
      if (this.shopDefaultList.length > i) {
        this.shopList.push(this.shopDefaultList[i]);
      }
    }
  }

  detailShop(data) {
    this.shopSeq = data.SHOP_SEQ;
    this.shopData = data;
    this.popupItem = data;
    this.router.navigate(['/shopPrice'], {queryParams: {popup: 'shopPopup'}});
    this.shopPopup = true;
  }

  openPopup(data) {
    this.popupItem = data;
    this.router.navigate(['/shopPrice'], {queryParams: {popup: 'popup'}});
    this.popup = true;
  }

  openOrderPopup() {
    this.router.navigate(['/shopPrice'], {queryParams: {popup: 'popup'}});
    this.popup = true;
  }

  openPotPopup(seq, shopData) {
    this.potSeq = seq;
    this.popupItem = shopData;
    this.shopData = shopData;
    this.router.navigate(['/shopPrice'], {queryParams: {popup: 'potPopup'}});
    this.potPopup = true;
  }

  userSession(falseKey) {
    this.userLogin = false;
    this.userStatus = true;
    this[falseKey] = false;
    window.history.back();
  }

  choiceClose(data) {
    this.shopList = this.shopList.filter((d, i) => {
      return d.SHOP_SEQ !== data;
    });
    this.shopDefaultList = this.shopDefaultList.filter((d, i) => {
      return d.SHOP_SEQ !== data;
    });
    this.popup = false;
    window.history.back();

    if (this.orderCount === 0) {
      const recommendList = [];
      this.shopDefaultList.some((shopData) => {
        if (recommendList.length < 2 && shopData.SHOP_LOCALE === 'Y') {
          recommendList.push(shopData);
          return;
        }
      });
      if (recommendList.length < 2) {
        this.orderCount = this.orderCount + 1;
        const modalRef = this.modalService.open(ModalAddComponent);
        modalRef.componentInstance.count = this.orderCount;
      } else {
        const modalRefOrder = this.modalService.open(ModalShopComponent);
        modalRefOrder.componentInstance.list = recommendList;
        modalRefOrder.result.then((d) => {
          if (d.length > 0) {
            this.orderCount = this.orderCount + d.length;
            this.priceResponse(d);
            const modalRef = this.modalService.open(ModalAddComponent);
            modalRef.componentInstance.count = this.orderCount;
          }
        });
        this.orderCount = this.orderCount + 1;
      }
    } else if (this.orderCount < 3) {
      this.orderCount = this.orderCount + 1;
      const modalRef = this.modalService.open(ModalAddComponent);
      modalRef.componentInstance.count = this.orderCount;
    }

    this.hs.httpPostExample('sessionCheck.do', null).then((sessionData: any) => {
      if (sessionData.status === 'succ') {
        this.userStatus = true;
      }
    });
  }

  priceResponse(shopList) {
    shopList.forEach((d) => {
      const params = {
        title: this.priceSession.title,
        subTitle: this.priceSession.subTitle,
        locale: this.priceSession.localeOption.name + '-' + this.priceSession.localeDetailOption.name,
        defaultOption: this.priceSession.defaultOption.name,
        date: this.priceSession.date,
        option: '',
        price: d.SALE_PRICE,
        shopSeq: d.SHOP_SEQ,
        shopName: d.SHOP_NAME,
        shopPhone: d.SHOP_PHONE,
        mainCall: d.MAIN_CALL
      };
      this.hs.httpPostExample('orderService.do', params).then((data: any) => {
        this.shopList = this.shopList.filter((removeData, i) => {
          return removeData.SHOP_SEQ !== d.SHOP_SEQ;
        });
        this.shopDefaultList = this.shopDefaultList.filter((removeData, i) => {
          return removeData.SHOP_SEQ !== d.SHOP_SEQ;
        });
        this.toastService.show(data.msg, {classname: 'bg-success text-light', delay: 5000});
      });
    });
    const url = window.location;
    this.gtag.config('AW-665174767');
    this.gtag.event('conversion', {
      send_to: 'AW-665174767/kgOYCK7wyoIYEO-Fl70C',
      event_callback: url
    });
    this.onScroll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
