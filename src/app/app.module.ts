import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app/app.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    DetailProductComponent,
    HomeComponent,
    DetailProductComponent,
    OrderListComponent,
    UserProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      
    }
    
  ],
  bootstrap: [
    // OrderComponent
    AppComponent
    //OrderConfirmComponent
    // LoginComponent
    // RegisterComponent
    // DetailProductComponent
    
    
  ]
})
export class AppModule { }
