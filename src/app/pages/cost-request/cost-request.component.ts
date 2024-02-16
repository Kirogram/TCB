import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {ParameterService} from '../../service/parameter.service';

@Component({
  selector: 'app-cost-request',
  templateUrl: './cost-request.component.html',
  styleUrls: ['./cost-request.component.scss']
})
export class CostRequestComponent implements OnInit {

  constructor(private router: Router,
              private hs: HttpService,
              private ps: ParameterService) {
    document.documentElement.scrollTop = 0;
    const params = {pageName: '신청페이지', subName: '초기화면'};
    this.hs.httpPostExample('pageHistory.do', params).then((data: any) => {
    });
  }

  ngOnInit() {
  }
}
