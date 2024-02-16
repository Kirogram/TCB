import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';
import {ParameterService} from '../../../service/parameter.service';
import {ModalDefaultComponent} from '../../../modal/modal-default/modal-default.component';
import {IAngularMyDpOptions} from 'angular-mydatepicker';
import {ToastService} from '../../../modal/toast/toast-service';

@Component({
  selector: 'app-building-cleaning',
  templateUrl: './building-cleaning.component.html',
  styleUrls: ['./building-cleaning.component.scss']
})
export class BuildingCleaningComponent implements OnInit {

  selectNumber = 1;
  localeData = [];
  localeDetailData = [];
  countries = [];
  selectedValue = null;
  localeValue = null;
  localeDetailValue = null;
  cleanOption = null;
  model = null;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    monthSelector: false,
    yearSelector: false,
    selectorHeight : '320px',
    selectorWidth : '300px'
  };

  localePopup = false;
  titleText = '대표 지역을 선택해주세요';
  localeDetailView = 1;

  constructor(private hs: HttpService,
              private router: Router,
              public ps: ParameterService,
              private toastService: ToastService) {
    document.documentElement.scrollTop = 0;
    const params = {pageName: '신청페이지', subName: '오피스청소'};
    this.hs.httpPostExample('pageHistory.do', params).then((data: any) => {
    });
    this.hs.httpPostExample('selectLocale.do', null).then((data: any) => {
      this.localeData = data;
    });
  }

  ngOnInit() {
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
  }

  localeDetail() {
    this.hs.httpPostExample('selectLocaleDetail.do', this.localeValue).then((data: any) => {
      this.localeDetailData = data;
    });
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
    const scrollData = document.getElementById('localeDiv').offsetTop;
    mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
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

  movePrice() {
    if (this.cleanOption == null) {
      this.toastService.show('장소를 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('cleaningDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.localeValue == null) {
      this.toastService.show('지역을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.localeDetailValue == null) {
      this.toastService.show('세부 지역을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.selectedValue == null) {
      this.toastService.show('평수를 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.model == null) {
      this.toastService.show('청소예정일을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('dateDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    }

    const params = {
      title: '오피스청소',
      subTitle: this.cleanOption,
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
