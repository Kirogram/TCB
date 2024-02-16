import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {NgbCalendar, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ParameterService} from '../../../service/parameter.service';
import {ModalDefaultComponent} from '../../../modal/modal-default/modal-default.component';
import {IAngularMyDpOptions} from 'angular-mydatepicker';
import {ToastService} from '../../../modal/toast/toast-service';

@Component({
  selector: 'app-product-cleaning',
  templateUrl: './product-cleaning.component.html',
  styleUrls: ['./product-cleaning.component.scss']
})
export class ProductCleaningComponent implements OnInit {
  selectNumber = 1;
  selectProduct = null;
  localeData = [];
  localeDetailData = [];
  localeValue = null;
  localeDetailValue = null;
  itemMainValue = null;
  mainItemList = [];
  subItemList = [];
  allOptionData = [];
  optionSelected = null;
  model;
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    monthSelector: false,
    yearSelector: false
  };

  constructor(private hs: HttpService,
              private router: Router,
              private calendar: NgbCalendar,
              public ps: ParameterService,
              private toastService: ToastService) {

    const params = {pageName: '신청페이지', subName: '제품청소'};
    this.hs.httpPostExample('pageHistory.do', params).then((data: any) => {
    });
    this.hs.httpPostExample('selectLocale.do', null).then((data: any) => {
      this.localeData = data;
    });
  }

  ngOnInit() {
  }

  localeDetail() {
    this.hs.httpPostExample('selectLocaleDetail.do', this.localeValue).then((data: any) => {
      this.localeDetailData = data;
    });
  }

  changeItem(item) {
    this.subItemList = [];
    this.optionSelected = null;
    this.itemMainValue = null;
    this.selectProduct = item;
    this.hs.httpPostExample('selectPriceOption.do', item).then((data: any) => {
      this.allOptionData = data;
      const mainKey = data.map((d) => {
        return d.MAIN_OPTION_ID;
      });
      this.mainItemList = [];
      mainKey.forEach((d, index) => {
        if (mainKey.indexOf(d) === index) {
          this.mainItemList.push({id: d, name: d});
        }
      });

      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
    });

  }

  subItem(data) {
    this.subItemList = this.allOptionData.filter((d) => {
      return d.MAIN_OPTION_ID === data.id;
    });
  }

  optionClick(subData) {
    this.optionSelected = (this.optionSelected === subData ? null : subData);
    const mainDiv = document.getElementById('mainPanel');
    const scrollData = document.getElementById('dateDiv').offsetTop;
    mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
  }

  openPrice() {

    if (this.selectProduct == null) {
      this.toastService.show('제품을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
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
    } else if (this.itemMainValue == null) {
      this.toastService.show('옵션을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.optionSelected == null) {
      this.toastService.show('상세 옵션을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('localeDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    } else if (this.model == null) {
      this.toastService.show('청소 예정일을 선택해 주세요', {classname: 'bg-success text-light', delay: 3000});
      const mainDiv = document.getElementById('mainPanel');
      const scrollData = document.getElementById('dateDiv').offsetTop;
      mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
      return;
    }

    const params = {
      title: '제품청소',
      subTitle: this.selectProduct,
      localeOption: this.localeValue,
      localeDetailOption: this.localeDetailValue,
      defaultOption: {id: this.optionSelected.SUB_OPTION_ID, name: this.optionSelected.MAIN_OPTION_ID},
      addOption: [this.optionSelected.SUB_OPTION_NAME],
      date: this.model.singleDate.formatted
    };

    this.hs.httpPostExample('cleaningOption.do', params).then((data: any) => {
      if (data) {
        this.router.navigate(['/shopPrice']);
      }
    });
  }
}
