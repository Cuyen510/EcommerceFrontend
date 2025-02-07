import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginDTO } from '../../dtos/user/login.dtos';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../services/token.service';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { ApiResponse } from '../../responses/api.response';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // standalone: true,
  // imports: [
  //   FooterComponent,
  //   HeaderComponent,
  //   CommonModule,
  //   FormsModule,
  // ]
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!: NgForm;

  phone: string = "0985032";
  password: string = '123';

  roles : Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role;
  showPassword: boolean = false;
  userResponse?: UserResponse
  
  
  
  constructor(private router: Router, 
              private userService: UserService,
              private tokenService: TokenService,
              private roleService: RoleService){
    this.phone = '';
    this.password = '';
    this.selectedRole = {id: 0 , name: "null"}
  }

  ngOnInit(){
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[])=>{
        debugger
        this.roles = roles;
      },

      error : (error: any) => {
        debugger
        console.error('Error getting role: ', error);
      }
    });
  }
  


  onPhoneChange(){
    console.log(`Phone typed = ${this.phone}`)
  }

  login(){
    const message = `phone:${this.phone}`+
                    `password:${this.password}`;
                    
    //alert(message);
    debugger
    const loginDTO:  LoginDTO= {
        "phone_number": this.phone,
        "password": this.password,
        "role_id": this.selectedRole?.id 
    }

    this.userService.login(loginDTO)
      .subscribe({
        next: (response: ApiResponse) =>{
          debugger
          const { token } = response.data.token;
          if(this.rememberMe){
            debugger
            this.tokenService.saveToken(response.data.token);
            this.tokenService.saveUser(response.data)
            this.userService.getUserDetail(token).subscribe({
              next: (apiResponse2: ApiResponse) =>{
                debugger
                this.userResponse = {
                ...apiResponse2.data,
                date_of_birth: new Date(apiResponse2.data.date_of_birth),
              };
              this.userService.saveUserResponseToLocalStorage(this.userResponse);   
              }
            });
        }
          
        this.router.navigate(['']);  
        },
        complete: () =>{
          debugger
        },

        error: (error: any) =>{
          debugger
          alert(`Cannot register, error: ${error?.error?.message}`);
        }
      })

  }

  createAccount(){
    debugger
    this.router.navigate(['/register']);
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
