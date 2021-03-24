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
  email: string = "";
  constructor(private api: ApiService) { }
  Login(_Need: number) {
    let req = {}
    switch (_Need) {
      case 113:
        if (this.username.trim() == "" || this.password.trim() == "") { alert("帳號及密碼不得為空") }
        else {
          req = { username: this.username, password: this.password };
          this.api.postData(113, req).subscribe(el => {
            console.log(el);
          });
        }
        break;
      case 127:
        if (this.signpass_2 !== this.signpass) { alert("密碼及再次確認必須相同") }
        else if (this.signname.trim() == "" || this.signpass.trim() == "") { alert("帳號及密碼不得為空") }
        else {
          req = { username: this.signname, password: this.signpass, email: this.email }
          this.api.postData(127, req).subscribe(el => {
            console.log(el);
          });
        }
        break;
    }
  }
  toggleForm() {
    this.changeSign = !this.changeSign;
  }
  ngOnInit() {


  }
}
