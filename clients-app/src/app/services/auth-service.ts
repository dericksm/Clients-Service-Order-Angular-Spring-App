import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiURL: string = environment.apiURL + "/api/users";
  private jwtHelper: JwtHelperService = new JwtHelperService();

  save(user: User): Observable<any> {
    return this.http.post(this.apiURL, user);
  }

  login(username: string, password: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("grant_type", "password");

    const headers = {
      Authorization:
        "Basic " + btoa(`${environment.clientId}:${environment.clientSecret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return this.http.post(
      environment.apiURL + "/oauth/token",
      params.toString(),
      { headers }
    );
  }

  isAuthenticated() {
    const token = this.getToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    } 
    return false
  }

  getToken() {
    let token: any = localStorage.getItem("access_token");
    if (token) {
      token = JSON.parse(token).access_token;
      return token;
    } else {
      return null;
    }
  }

  closeSession(){
    localStorage.removeItem('access_token')
  }

  getCurrentUser(){
    const token = this.getToken()
    if(token) {
      return this.jwtHelper.decodeToken(token).user_name
    }
    return null
  }
}
