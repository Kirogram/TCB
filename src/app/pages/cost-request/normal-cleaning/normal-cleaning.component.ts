import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ParameterService} from '../../../service/parameter.service';
import {ModalDefaultComponent} from '../../../modal/modal-default/modal-default.component';

@Component({
  selector: 'app-normal-cleaning',
  templateUrl: './normal-cleaning.component.html',
  styleUrls: ['./normal-cleaning.component.scss']
})
export class NormalCleaningComponent implements OnInit {

  userLogin = false;
  etcText = null;
  localeData = [];
  localeDetailData = [];
  localeValue = null;
  localeDetailValue = null;
  cleanOption = null;

  constructor(private hs: HttpService,
              private router: Router,
              public ps: ParameterService,
              private modalService: NgbModal) {
    document.documentElement.scrollTop = 0;

    const params = {pageName: '신청페이지', subName: '기타문의'};
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

  selectCleaning(select) {
    this.cleanOption = select;
    const mainDiv = document.getElementById('mainPanel');
    const scrollData = document.getElementById('localeDiv').offsetTop;
    mainDiv.scrollTo({top: scrollData - 150, behavior: 'smooth'});
  }

  checkUser() {
    if (this.cleanOption === null) {
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '청소 분류를 선택해 주세요.';
      return;
    } else if (this.localeValue === null) {
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '지역을 선택해주세요.';
      return;
    } else if (this.localeDetailValue === null) {
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '세부 지역을 선택해주세요.';
      return;
    }
    this.hs.httpPostExample('sessionCheck.do', null).then((data: any) => {
      if (data.status === 'succ') {
        this.insertOrderServiceEtc();
      } else {
        this.userLogin = true;
      }
    });
  }

  insertOrderServiceEtc() {
    if (this.etcText === null) {
      this.etcText = '';
    }

    const params = {
      title: '특수신청',
      text: this.etcText,
      cleanOption: this.cleanOption,
      locale: this.localeValue.name + '-' + this.localeDetailValue.name,
    };
    this.hs.httpPostExample('insertOrderServiceEtc.do', params).then((data: any) => {
      this.router.navigate(['/orderSucc']);
    });
  }

  loginClose() {
    this.userLogin = false;
  }

  userSession() {
    this.userLogin = false;
    this.insertOrderServiceEtc();
  }
}
