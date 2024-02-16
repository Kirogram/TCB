import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-bottom-desc',
  templateUrl: './main-bottom-desc.component.html',
  styleUrls: ['./main-bottom-desc.component.scss']
})
export class MainBottomDescComponent implements OnInit {

  changeCss = false;
  changeCss2 = false;
  data = [
    {
      number: '01',
      title: `철저한 업체관리<br>O-S-O 시스템`,
      desc: `합당한 이유 없는 고객 컴플레인 미대응 업체는 경고없이 바로 One-Strike-Out 시스템을 통해 폐점 처리 됩니다<br>A/S기간을 명시하고 있습니다`,
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668783879632note.png',
    }, {
      number: '02',
      title: `검수 후 입금!<br>후불제 서비스`,
      desc: `고객님이 직접 눈으로 확인하시고 서비스 금액을 입금하는 방식으로 보다 안전하고 믿을 수 있는 거래를 추구합니다<br>
              더클린박스는 확정 수수료가 없습니다`,
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668783883831card.png',
    }, {
      number: '03',
      title: `청소전문가의<br>책임 서비스`,
      desc: `업체 인증 시스템을 통해 전문가가 직접 서비스하는 업체만 입점합니다<br>
              서비스 품질 향상을 위해 업체모니터링을 강화하고 있습니다`,
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668783873912clean.png',
    }, {
      number: '04',
      title: `빠르고 확실한<br>통합 고객센터 운영`,
      desc: `예약 , 신고 , 문의를 통합적으로 관리하고 안내하는 통합 고객센터를 통해 언제나 편리하고 신속하게 업무처리를 도와드립니다`,
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668783867568service.png',
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onIntersection2(data) {
    data.forEach((d) => {
      if (d.isIntersecting === true && this.changeCss2 === false) {
        this.changeCss2 = true;
      }
    });
  }

  onIntersection(data) {
    data.forEach((d) => {
      if (d.isIntersecting === true && this.changeCss === false) {
        this.changeCss = true;
      }
    });
  }
}
