import {Component, Input, OnInit} from '@angular/core';
import {ParameterService} from './service/parameter.service';
import {HttpService} from './service/http.service';

declare let Kakao: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() beforeUrl = null;
  title = 'CleanBox';
  windowHeight;

  constructor(private hs: HttpService,
              private ps: ParameterService) {
    const referrer = document.referrer;
    const params = {beforeUrl: referrer};
    this.hs.httpPostExample('logHistory.do', params).then((data: any) => {
    });
  }

  ngOnInit() {
    Kakao.init('2e848e9560af10b8895266c40cb7debf');
    this.windowHeight = window.innerHeight - 58;
    this.ps.browserWidth = window.innerWidth;
  }

  onResize() {
    this.windowHeight = window.innerHeight - 58;
    this.ps.browserWidth = window.innerWidth;
  }
}
