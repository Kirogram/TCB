import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  localHost = 'http://localhost:8080/';
  // localHost = '/';
  constructor(private http: HttpClient) {

  }

  httpPostExample(url, params) {
    return new Promise((resolve, reject) => {
      this.http.post(this.localHost + url, params, {
        withCredentials: true
      }).subscribe((val) => {
        resolve(val);
      }, response => {
        resolve(response);
      });
    });
  }

  httpGetExample(url, params) {
    return new Promise((resolve, reject) => {
      this.http.get(this.localHost + url).subscribe((val) => {
        resolve(val);
      }, response => {
        resolve(response);
      });
    });
  }
}
