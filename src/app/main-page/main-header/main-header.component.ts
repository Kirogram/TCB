import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  data = [
    {
      title1: '입주청소 · 이사청소',
      title2: '꼼꼼하게 비교하세요',
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668489972768bg 1-min.png',
    }, {
      title1: '정보 제공형 서비스',
      title2: '믿을수 있는 플랫폼',
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668489974365bg 2-min.png',
    }, {
      title1: '최대 20% 할인과',
      title2: '1+1 패키지 까지',
      img: 'https://cleanbox.shop/fileDownLoad/notice/1668489976055bg 3-min.png',
    },
  ];
  constructor() {
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
  }

}
