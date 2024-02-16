import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-use-infomation',
  templateUrl: './use-infomation.component.html',
  styleUrls: ['./use-infomation.component.scss']
})
export class UseInfomationComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }

  moveNotice(data) {
    this.router.navigate(['/detailNotice'], {queryParams: {seq: data}});
  }
}
