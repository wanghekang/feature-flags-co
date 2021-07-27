import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(params): Observable<any> {
    const url = environment.url + '/api/Authenticate/login';
    return this.http.post(url, params);
  }

  register(params): Observable<any> {
    // const headers = new HttpHeaders();
    // const a = headers.set('Access-Control-Request-Headers', '*');
    // console.log(a.keys());
    
    const url = environment.url + '/api/Authenticate/register';
    return this.http.post(url, params);

    // return this.http.post(url, params, { headers: a });
  }

  forgetPassword(params): Observable<any> {
    const url = environment.url + '/api/Authenticate/forgetpassword';
    return this.http.post(url, params);
  }

  resetPassword(params): Observable<any> {
    const url = environment.url + '/api/Authenticate/resetpassword';
    return this.http.post(url, params);
  }
}
