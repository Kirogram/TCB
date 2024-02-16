import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-main-qa',
  templateUrl: './main-qa.component.html',
  styleUrls: ['./main-qa.component.scss']
})
export class MainQaComponent implements OnInit {

  qaData;
  constructor(private hs: HttpService) {
    this.hs.httpPostExample('selectQaMain.do', null).then((data: any) => {
      this.qaData = data;
    });
  }

  ngOnInit() {
  }

}
