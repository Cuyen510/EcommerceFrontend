import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // standalone: true,
  // imports: [    
  //   CommonModule,
  //   RouterModule
  // ]
})
export class HeaderComponent {
  constructor(
    private tokenService: TokenService,
  ){}

  getToken(): boolean{
    if(this.tokenService.getToken() != null)
      return true;
    return false;
  }

  removeToken(): void{
    this.tokenService.signOut();
  }

}
