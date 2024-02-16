import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ModalDefaultComponent} from '../../modal/modal-default/modal-default.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-insert-reviews',
  templateUrl: './insert-reviews.component.html',
  styleUrls: ['./insert-reviews.component.scss']
})
export class InsertReviewsComponent implements OnInit {

  @Input() orderData = null;
  params = {
    ORDER_NUMBER: 0,
    SHOP_NAME: '',
    SHOP_SEQ: 0,
    LOCALE_NAME: '',
    MAIN_IMG: '',
    SERVICE_NAME: '',
    RES_SCORE: 5,
    PRO_SCORE: 5,
    SER_SCORE: 5,
    TEXT: ''
  };


  constructor(private hs: HttpService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.params.ORDER_NUMBER = this.orderData.ORDER_SEQ;
    this.params.SHOP_NAME = this.orderData.SHOP_NAME;
    this.params.SERVICE_NAME = this.orderData.ORDER_TITLE;
    this.params.SHOP_SEQ = this.orderData.ORDER_SHOP_SEQ;
    this.params.LOCALE_NAME = this.orderData.ORDER_LOCALE;
  }


  logoUpload(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const formData: FormData = new FormData();
    formData.append('file', target.files[0], target.files[0].name);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/reviewFileUpload.do', true);
    xhr.send(formData);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const resultData = JSON.parse(xhr.response);
        this.params.MAIN_IMG = resultData.imageUrl;
      }
    };
  }

  insertReview() {

    if (this.params.SER_SCORE === 0) {
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '서비스 만족도를 평가해 주세요.';
      return;
    } else if (this.params.TEXT === '') {
      const modalRef = this.modalService.open(ModalDefaultComponent);
      modalRef.componentInstance.name = '후기내용을 입력해 주세요.';
      return;
    }

    this.hs.httpPostExample('insertReviews.do', this.params).then((data: any) => {
      location.reload();
    });

  }
}
