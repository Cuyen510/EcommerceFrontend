import { Component } from '@angular/core';
import { OrderResponse } from '../../responses/order/order.response';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ApiResponse } from '../../responses/api.response';



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  orders: OrderResponse[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  keyword:string = "";
  // id: number=1;
  visiblePages: number[] = [];
  // localStorage?:Storage;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    //private location: Location,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    debugger
    // this.currentPage = Number(this.localStorage?.getItem('currentOrderAdminPage')) || 0; 
    this.getAllOrders(this.keyword, this.tokenService.getUserId(), this.currentPage, this.itemsPerPage);
  }
  searchOrders() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    debugger
    this.getAllOrders(this.keyword.trim(),this.tokenService.getUserId(), this.currentPage, this.itemsPerPage);
  }

  getAllOrders(keyword: string, user_id: number, page: number, itemsPerPage: number) {
    debugger
    this.orderService.getAllOrders(keyword, user_id, page, itemsPerPage).subscribe({
      next: (response: any) => {
        debugger        
        this.orders = response.orders;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching products:', error);
      }
    });    
  }


  // getOrdersByUserId(userId: number) {
  //   debugger
  //   this.orderService.getOrdersByUserId(userId).subscribe({
  //     next: (response: any) => {
  //       debugger        
  //       this.orders = response;
  //       this.totalPages = apiResponse.data.totalPages;
  //       this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
  //     },
  //     complete: () => {
  //       debugger;
  //     },
  //     error: (error: any) => {
  //       debugger;
  //       console.error('Error fetching products:', error);
  //     }
  //   });    
  // }

  // generateId(): number{
  //   return this.id++;
  // }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page < 0 ? 0 : page;
    //this.localStorage?.setItem('currentOrderAdminPage', String(this.currentPage));         
    this.getAllOrders(this.keyword, this.tokenService.getUserId(), this.currentPage, this.itemsPerPage );
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
        .map((_, index) => startPage + index);
  }

  cancel(id:number) {
    const confirmation = window
      .confirm('Are you sure you want to delete this order?');
    if (confirmation) {
      debugger
      this.orderService.cancelOrder(id).subscribe({
        next: (response: ApiResponse) => {
          debugger 
          //location.reload(); 
          console.log(response);         
        },
        complete: () => {
          debugger;          
        },
        error: (error: any) => {
          debugger;
          console.error('Error fetching order:', error);
        }
      });    
    }
  }


  viewDetails(order:OrderResponse) {
    debugger
    this.router.navigate(['/order_details/', order.id]);
  }

}
