import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  //private readonly TOKEN_KEY = 'access_token';
  // private jwtHelper = new JwtHelperService();

  constructor() {}

  public saveToken(token: string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  getToken():string {
    return window.localStorage.getItem(TOKEN)!;
  }

  signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }



  getUser(): any{
    return JSON.parse(window.localStorage.getItem(USER)!);
  }

  getUserId(): number {
    const user = this.getUser();
    if(user == null){
      return 0;
    }
    return user.id;
  }
  
  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }  


  
  // setToken(token: string): void {
  //     localStorage.setItem(this.TOKEN_KEY, token);
  // }
       
// getUserInfoFromToken(): any {
//     debugger
//     return this.jwtHelper.decodeToken(this.getToken() ?? '');        
// }
// isTokenExpired(): boolean { 
//     if(this.getToken() == null) {
//         return false;
//     }       
//     return this.jwtHelper.isTokenExpired(this.getToken()!);
// }
}
