import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  changeSign = false;
  username: string = '';
  password: string = '';
  constructor(private api: ApiService) { }
  Login() {
    const req = { username: this.username, password: this.password };
    this.api.postData(req);
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {
    this.api.data$.subscribe(el => {
      console.log(el);
    })
  }
}
