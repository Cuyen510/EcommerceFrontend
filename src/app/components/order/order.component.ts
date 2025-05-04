import { Component, OnInit } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { OrderDTO } from '../../dtos/order/order.dto';
import { Order } from '../../models/order';
import { CartItemDTO } from '../../dtos/order/cart.item.dto';
import { OrderDetail } from '../../models/order.detail';
import { ApiResponse } from '../../responses/api.response';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orderForm: FormGroup; 
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = ''; 
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 0, 
    fullname: '',
    email: '', 
    phone_number: '', 
    address: '',
    note: '',
    total_money: 0, 
    payment_method: 'cod', 
    shipping_method: 'express', 
    cart_items: [],
    status: "pending",
    shipping_date: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
    tracking_number: '123567',
    shipping_address: '',
  };
  //coupon_code: '',
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
   
    this.orderForm = this.formBuilder.group({
      fullname: ['quyen xx', Validators.required],       
      email: ['bntquyenn@gmail.com', [Validators.email]], 
      phone_number: ['11445547', [Validators.required, Validators.minLength(6)]],
      address: ['nhà x ngõ y', [Validators.required, Validators.minLength(5)]], 
      note: ['dễ vữ'],
      shipping_method: ['express'],
      payment_method: ['cod'],
      shipping_address: ['24 tp']
    });
  }
  
  ngOnInit(): void {  
    debugger
    if (!this.tokenService.getUser 
      //this.tokenService.isTokenExpired()
          ) {
      this.router.navigate(['/']);
    }     
    
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); 

    
    debugger    
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products: Product[]) => {            
        debugger
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id == productId);
          if (product) {
            product.thumbnail = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }          
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
        console.log('haha');
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });        
  }
  placeOrder() {
    debugger
    if (this.orderForm.valid) {
      /*
      this.orderData.fullname = this.orderForm.get('fullname')!.value;
      this.orderData.email = this.orderForm.get('email')!.value;
      this.orderData.phone_number = this.orderForm.get('phone_number')!.value;
      this.orderData.address = this.orderForm.get('address')!.value;
      this.orderData.note = this.orderForm.get('note')!.value;
      this.orderData.shipping_method = this.orderForm.get('shipping_method')!.value;
      this.orderData.payment_method = this.orderForm.get('payment_method')!.value;
      */
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderData.user_id = this.tokenService.getUserId();
      this.orderData.total_money = this.totalAmount;
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response: ApiResponse) => {
          debugger;          
          console.log('Đặt hàng thành công');
          // this.cartItemDTO = this.cartItems.map(cartItem => ({
          //     product_id: cartItem.product.id,
          //     quantity: cartItem.quantity
          //   }));
          // this.orderService.createOrderDetail(response.id, this.cartItemDTO).subscribe({
          //   next: (response: OrderDetail[]) =>{
          //     debugger
          //     console.log(response);
          //   },
            // complete: ()=>{
            //   debugger
            //   console.log("success")
            // },
            // error: (error: any) => {
            //   debugger
            //   console.log(error);
            // }
          // })
          this.router.navigate(['/order_details/', response.data.id]);
        },
        complete: () => {
          debugger;
          this.calculateTotal();
        },
        error: (error: any) => {
          debugger;
          console.error('Lỗi khi đặt hàng:', error);
        },
      });
    } else {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }        
  }
    
    
  
  calculateTotal(): void {
      this.totalAmount = this.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
      );
  }

  applyCoupon(): void {
    
  }
}

