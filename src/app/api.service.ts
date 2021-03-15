import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ApiService {
    data: any = [];
    private SubData = new BehaviorSubject(this.data);
    data$ = this.SubData.asObservable();
    constructor(private http: HttpClient) { }
    postData(_Obj: any) {
        let keys = Object.keys(_Obj);
        const req = new FormData();
        for (let i = 0; i < keys.length; i++) { req.append(keys[i], _Obj[keys[i]]); };
        this.http.post('assets/php/test.php', req).subscribe(el => {
            this.data = el;
            this.SubData.next(this.data);
        })
    }
}
