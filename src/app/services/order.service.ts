import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderDetailDTO } from '../dtos/order/order.detail.dto';
import { CartItemDTO } from '../dtos/order/cart.item.dto';
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${enviroment.apiBaseUrl}/orders`;

  private apiOrderDetailUrl = `${enviroment.apiBaseUrl}/order_details`;

  constructor(private http: HttpClient) {}

  placeOrder(orderData: OrderDTO): Observable<any> {    
    return this.http.post(this.apiUrl, orderData);
  }
  getOrderById(orderId: number): Observable<any> {
    const url = `${enviroment.apiBaseUrl}/orders/${orderId}`;
    return this.http.get(url);
  }

  getOrdersByUserId(userId: number): Observable<any> {
    const url = `${enviroment.apiBaseUrl}/orders/user/${userId}`;
    return this.http.get(url);
  }

  getAllOrders(keyword:string, user_id: number,
      page: number, limit: number
  ): Observable<ApiResponse> {
      const params = new HttpParams()
      .set('user_id', user_id.toString())
      .set('keyword', keyword)      
      .set('page', page.toString())
      .set('limit', limit.toString());            
      return this.http.get<ApiResponse>(this.apiUrl+'/user', { params });
  }

  cancelOrder(orderId: number): Observable<ApiResponse> {
    const params = new HttpParams()
    .set('id', orderId)                 
    return this.http.put<ApiResponse>(this.apiUrl, { params });
  }

}
