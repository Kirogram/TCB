import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {ParameterService} from '../../service/parameter.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {

  reviewData = [];
  reviewDefaultData = [];
  changeCss = false;

  constructor(private hs: HttpService,
              public ps: ParameterService) {
    this.hs.httpPostExample('selectReviews.do', null).then((data: any) => {
      let count = 0;
      data.forEach((d) => {
        count = count + 1;
        const reviewScore = [];
        for (let i = 0; i < d.TOTAL_SCORE; i++) {
          reviewScore.push(1);
        }
        d.TOTAL_SCORE = reviewScore;
        this.reviewDefaultData.push(d);
        if (count > 1) {
          count = 0;
          this.reviewData.push(this.reviewDefaultData);
          this.reviewDefaultData = [];
        }
      });
    });
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
}
