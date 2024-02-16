import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  changeCss = false;
  changeCss2 = false;

  constructor() {

  }

  ngOnInit() {
  }

  onIntersection(data) {
    data.forEach((d) => {
      if (d.isIntersecting === true && this.changeCss === false) {
        this.changeCss = true;
      }
    });
  }

  onIntersection2(data) {
    data.forEach((d) => {
      if (d.isIntersecting === true && this.changeCss2 === false) {
        this.changeCss2 = true;
      }
    });
  }
}
