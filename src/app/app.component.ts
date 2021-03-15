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
  signname: string = "";
  signpass: string = "";
  signpass_2: string = "";
  constructor(private api: ApiService) { }
  Login(_Need: number) {
    let req = {}
    switch (_Need) {
      case 113:
        if (this.username.trim() == "" || this.password.trim() == "") { alert("帳號及密碼不得為空") }
        else {
          req = { username: this.username, password: this.password };
          this.api.postData(113, req);
        }
        break;
      case 127:
        if (this.signpass_2 !== this.signpass) { alert("密碼及再次確認必須相同") }
        else if (this.signname.trim() == "" || this.signpass.trim() == "") { alert("帳號及密碼不得為空") }
        else {
          req = { username: this.signname, password: this.signpass }
          this.api.postData(127, req);
        }
        break;
    }
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {
    this.api.data$.subscribe(el => {
      alert(el == true ? "你好" : "請先註冊");
    })
    this.api.signup$.subscribe(el => {
      alert(el == true ? "註冊完成" : "註冊失敗");
    })
  }
}
