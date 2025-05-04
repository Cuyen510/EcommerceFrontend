import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Map<number, number> = new Map<number, number>(); 
  

  constructor() {         
    this.refreshCart()
  }
  public refreshCart(){
    const storedCart = window.localStorage.getItem(this.getCartKey());
    if (storedCart) {
      this.cart = new Map(JSON.parse(storedCart));      
    } else {
      this.cart = new Map<number, number>();
    }
  }
  private getCartKey():string {    
    const userResponseJSON = window.localStorage.getItem('ecom-user'); 
    const userResponse = JSON.parse(userResponseJSON!);  
    debugger
    return `cart:${userResponse?.id ?? ''}`;

  }

  addToCart(productId: number, quantity: number): void {
    debugger
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartToLocalStorage();
  }
  
  getCart(): Map<number, number> {
    return this.cart;
  }
  private saveCartToLocalStorage(): void {
    debugger
    window.localStorage.setItem(this.getCartKey(), JSON.stringify(Array.from(this.cart.entries())));
  }  
  setCart(cart : Map<number, number>) {
    this.cart = cart ?? new Map<number, number>();
    this.saveCartToLocalStorage();
  }
  clearCart(): void {
    this.cart.clear(); 
    this.saveCartToLocalStorage(); 
  }
}
