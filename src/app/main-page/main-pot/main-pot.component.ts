import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-pot',
  templateUrl: './main-pot.component.html',
  styleUrls: ['./main-pot.component.scss']
})
export class MainPotComponent implements OnInit {

  afterData;
  editorData;

  constructor(private hs: HttpService,
              private router: Router) {
    this.hs.httpPostExample('selectAfterMain.do', null).then((data: any) => {
      this.afterData = data;
    });
    this.hs.httpPostExample('selectEditorChoiceMain.do', null).then((data: any) => {
      this.editorData = data;
    });


  }

  ngOnInit() {
  }

  moveAfter(data) {
    this.router.navigate(['/detailAfter'], {queryParams: {seq: data.SEQ}});
  }

  moveEditor(data) {
    this.router.navigate(['/detailEditor'], {queryParams: {seq: data.EDITOR_SEQ}});
  }

}
