import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ParameterService} from '../../service/parameter.service';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.scss']
})
export class LiveListComponent implements OnInit {

  orderListData = [];
  orderContentData = [];

  constructor(private hs: HttpService,
              public ps: ParameterService) {
    this.orderList();
  }

  ngOnInit() {
  }

  orderList() {
    this.hs.httpPostExample('selectOrderMainList.do', null).then((data: any) => {
      let count = 0;
      data.forEach((d) => {
        this.orderContentData.push(d);
        count = count + 1;
        if (count > 2) {
          count = 0;
          this.orderListData.push(this.orderContentData);
          this.orderContentData = [];
        }
      });
    });
  }


}
