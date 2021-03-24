import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }
    postData(_GateWay: number, _Obj: any) {
        let keys = Object.keys(_Obj);
        const req = new FormData();
        for (let i = 0; i < keys.length; i++) { req.append(keys[i], _Obj[keys[i]]); };
        switch (_GateWay) {
            case 113:
                return this.http.post('assets/php/login.php', req).map(el => { return el; })
            case 127:
                return this.http.post('assets/php/signup.php', req).map(el => { return el; })
        }
    }
}
