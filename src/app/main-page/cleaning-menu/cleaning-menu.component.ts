import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cleaning-menu',
  templateUrl: './cleaning-menu.component.html',
  styleUrls: ['./cleaning-menu.component.scss']
})
export class CleaningMenuComponent implements OnInit {

  changeCss = false;
  otherShow = false;

  constructor() {
  }

  ngOnInit() {
  }

  onIntersection(data) {
    data.forEach((d) => {
      if (d.isIntersecting === true && this.changeCss === false) {
        this.changeCss = true;
      }

      if (d.isIntersecting === false) {
        this.otherShow = true;
      } else {

        this.otherShow = false;
      }
    });
  }
}
