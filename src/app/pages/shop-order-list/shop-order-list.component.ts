import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ParameterService} from '../../service/parameter.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shop-order-list',
  templateUrl: './shop-order-list.component.html',
  styleUrls: ['./shop-order-list.component.scss']
})
export class ShopOrderListComponent implements OnInit {

  shopOrderListData;

  constructor(private hs: HttpService,
              private ps: ParameterService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      const resultParams = {shopHash: params.shopHash};
      this.hs.httpPostExample('selectShopOrderList.do', resultParams).then((data: any) => {

        this.shopOrderListData = data;
      });
    });
  }

  ngOnInit() {
  }

  phoneCall(phoneNumber) {
    window.open('tel:' + phoneNumber);
  }

  updateOrderStauts(orderSeq) {
    this.hs.httpPostExample('updateOrderStauts.do', orderSeq).then((data: any) => {

      const removeSeq = this.shopOrderListData.some((d, i) => {
        if (d.ORDER_SEQ === orderSeq) {
          d.ORDER_STATUS = 'N';
          return;
        }
      });
    });
  }

}
