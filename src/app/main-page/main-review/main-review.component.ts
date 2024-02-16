import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-review',
  templateUrl: './main-review.component.html',
  styleUrls: ['./main-review.component.scss']
})
export class MainReviewComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
  }

  moveNotice(data) {
    this.router.navigate(['/detailNotice'], {queryParams: {seq: data}});
  }
}
