import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dtos';
import { enviroment } from '../enviroments/enviroment';
import { ApiResponse } from '../responses/api.response';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRegister= `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin= `${enviroment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${enviroment.apiBaseUrl}/users/details`;
  private apiConfig = {
    headers: this.createHeaders()
  }




  constructor(private http: HttpClient) 
  { 
    
  }

  private createHeaders() :HttpHeaders{
    return new HttpHeaders({'Content-Type': 'application/json',
                            'Accept-Language': 'vi'
    });
  }
  register(registerDTO: RegisterDTO): Observable<any>{
    return this.http.post(this.apiRegister, registerDTO,this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO,this.apiConfig);
  }

  getUserDetail(token: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer `+ token
      })
    })
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
    
      const userResponseJSON = JSON.stringify(userResponse);  
     
      window.localStorage.setItem('ecom-user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }

  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO): Observable<ApiResponse>  {
    debugger
    let userResponse = JSON.parse(window.localStorage.getItem('ecom-user')!);        
    return this.http.put<ApiResponse>(`${this.apiUserDetail}/${userResponse?.id}`,updateUserDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  removeUserFromLocalStorage():void {
    try {
      window.localStorage.removeItem('ecom-user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
    }
  }

  
}
