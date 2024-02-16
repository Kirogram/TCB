import {Component, OnInit} from '@angular/core';
import {NgbCalendar, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../../service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAngularMyDpOptions} from 'angular-mydatepicker';
import {ToastService} from '../../../modal/toast/toast-service';

@Component({
  selector: 'app-home-cleaning',
  templateUrl: './home-cleaning.component.html',
  styleUrls: ['./home-cleaning.component.scss']
})
export class HomeCleaningComponent implements OnInit {
  localeData = [];
  localeDetailData = [];
  selectedValue = null;
  localeValue = null;
  localeDetailValue = null;
  countries = [];
  cleanOption = null;
  cleanProduct = null;
  price;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    monthSelector: false,
    yearSelector: false,
    selectorHeight : '320px',
    selectorWidth : '100%'
  };
  model = null;
  hashDate;
  localePopup = false;
  titleText = '대표 지역을 선택해주세요';
  localeDetailView = 1;

  constructor(private router: Router,
              private hs: HttpService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService) {
    document.documentElement.scrollTop = 0;

    const count = 500;
    for (let i = 10; i < count; i++) {
      const miterSize = (i * 3.3).toFixed(1);
      if (i === 10) {
        this.countries.push({id: i, name: i + ' 평형 이하' + ' ( ' + miterSize + '㎡ )'});
      } else if (i === 499) {
        this.countries.push({id: i, name: i + ' 평형 이상' + ' ( ' + miterSize + '㎡ )'});
      } else {
        this.countries.push({id: i, name: i + ' 평형' + ' ( ' + miterSize + '㎡ )'});
      }
    }

    this.activatedRoute.queryParams.subscribe(hashKey => {
      if (hashKey.a) {
        this.cleanOption = hashKey.a;
      }
      if (hashKey.b) {
        this.cleanProduct = hashKey.b;
      }
      if (hashKey.c) {
        this.localeValue = {id: hashKey.c, name: hashKey.c};
      }
      if (hashKey.d) {
        this.localeDetailValue = {id: hashKey.d, name: hashKey.e};
      }
      if (hashKey.f) {
        this.selectedValue = this.countries.find((d, i) => {
          return d.id === Number(hashKey.f);
        });
      }
      if (hashKey.g) {
        this.model = {isRange: false, singleDate: {formatted: hashKey.g}};
      }

      if (hashKey.a && hashKey.b && hashKey.c && hashKey.d && hashKey.e && hashKey.f && hashKey.g) {
        this.moveShopPricePage();
      }
    });

    const params = {pageName: '신청페이지', subName: '입주청소'};
    this.hs.httpPostExample('pageHistory.do', params).then((data: any) => {
    });
    this.hs.httpPostExample('selectLocale.do', null).then((data: any) => {
      this.localeData = data;
    });
  }

  ngOnInit() {
  }

  localeMain(resultData) {
    this.localeValue = resultData;
    this.hs.httpPostExample('selectLocaleDetail.do', this.localeValue).then((data: any) => {
      this.localeDetailData = data;
      this.titleText = '세부 지역을 선택해주세요';
      this.localeDetailView = 2;
    });
  }

  localeSub(resultData) {
    this.localeDetailValue = resultData;
    this.titleText = '평수를 선택해주세요';
    this.localeDetailView = 3;
  }

  sizeMain(data) {
    this.selectedValue = data;
    this.localePopup = false;
    if (this.localeValue !== null) {
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('dateDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
    }
  }

  localePopupOpen(data) {
    if (data === 1) {
      this.titleText = '대표 지역을 선택해주세요';
      this.localeDetailView = 1;
      this.localePopup = true;
    } else {
      this.titleText = '평수를 선택해주세요';
      this.localeDetailView = 3;
      this.localePopup = true;
    }
  }

  selectCleaning(select) {
    this.cleanOption = select;
    const mainDiv = document.getElementById('mainPanel');
    const scrollData = document.getElementById('placeDiv').offsetTop;
    mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
  }

  selectProduct(select) {
    this.cleanProduct = select;
    const mainDiv = document.getElementById('mainPanel');
    const scrollData = document.getElementById('localeDiv').offsetTop;
    mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
  }

  moveShopPricePage() {

    if (this.cleanOption === null) {
      this.toastService.show('청소 분야를 선택해주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('cleaningDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.cleanProduct === null) {
      this.toastService.show('청소 장소를 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('placeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.localeValue === null) {
      this.toastService.show('지역을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.localeDetailValue === null) {
      this.toastService.show('세부 지역을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.selectedValue === null) {
      this.toastService.show('평수를 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.model === null) {
      this.toastService.show('청소예정일을 선택해 주세요', {classname: 'bg-success text-light', delay: 5000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('dateDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    }

    const params = {
      title: this.cleanOption,
      subTitle: this.cleanProduct,
      localeOption: this.localeValue,
      localeDetailOption: this.localeDetailValue,
      defaultOption: this.selectedValue,
      addOption: [],
      date: this.model.singleDate.formatted
    };

    this.hs.httpPostExample('cleaningOption.do', params).then((data: any) => {

      if (data) {
        this.router.navigate(['/shopPrice']);
      }
    });
  }
}
