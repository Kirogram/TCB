import {Component, OnInit} from '@angular/core';
import {Gtag} from 'angular-gtag';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private gtag: Gtag) {
  }

  ngOnInit() {
  }
}
