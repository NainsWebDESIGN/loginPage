import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ApiService {
    data: any = false;
    private SubData = new BehaviorSubject(this.data);
    data$ = this.SubData.asObservable();
    signup: any = false;
    private SubSign = new BehaviorSubject(this.signup);
    signup$ = this.SubSign.asObservable();
    constructor(private http: HttpClient) { }
    postData(_GateWay: number, _Obj: any) {
        let keys = Object.keys(_Obj);
        const req = new FormData();
        for (let i = 0; i < keys.length; i++) { req.append(keys[i], _Obj[keys[i]]); };
        switch (_GateWay) {
            case 113:
                this.http.post('assets/php/login.php', req).subscribe(el => {
                    this.data = el;
                })
                break;
            case 127:
                this.http.post('assets/php/signup.php', req).subscribe(el => {
                    this.signup = el;
                })
                break;
        }
    }
}
