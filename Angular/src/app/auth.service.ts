import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
readonly baseUrl = 'http://localhost:3000';
authtoken;
authUser;
headerParams;
headers;

constructor(private http: HttpClient) { }

//Register User
saveUser(formvalues){
  return this.http.post(this.baseUrl+'/register', formvalues)
}

// Attempts to Log in
signInUser(formValues){
  return this.http.post(this.baseUrl+'/signin', formValues)
}

// Save auth Details
saveAuthDetails(token, user){
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user))
  this.authtoken = token;
  this.authUser = user;
}

// Creating Headers for JWT
createAuthHeader() {
  this.authtoken = localStorage.getItem('token') || [];
  this.headerParams = new HttpHeaders({
    'Content-Type' : 'application/json',
    'authorization' : this.authtoken     
  })
  this.headers = {
    headers: this.headerParams
  }
}

 //Logout User
 logout() {
  this.authtoken = null;
  this.authUser = null;
  localStorage.clear();
}


}
