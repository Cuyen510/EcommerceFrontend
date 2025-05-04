import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []; 
  selectedCategoryId: number  = 0; 
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword:string = "";

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,    
    private router: Router,
    private tokenService: TokenService
    ) {}

  ngOnInit() {
    this.getProducts(this.keyword, this.selectedCategoryId, 0, this.itemsPerPage);
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        debugger
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  searchProducts() {
    debugger
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage );
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, itemsPerPage: number) {
    this.products = [];
    debugger
    this.productService.getProducts(keyword, selectedCategoryId, page, itemsPerPage).subscribe(res =>{
      res.products.forEach(element =>{
        element.url = `${enviroment.apiBaseUrl}/products/images/${element.thumbnail}`;
        this.products.push(element);
        this.totalPages = res.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      });
    }
      // next: (response: any) => {
      //   debugger
      //   response.products.forEach((product: Product) => {          
      //     product.url = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
      //   });
      //   this.products = response.products;
      //   this.totalPages = response.totalPages;
      //   // this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      // },
    //   complete: () => {
    //     debugger;
    //   },
    //   error: (error: any) => {
    //     debugger;
    //     console.error('Error fetching products:', error);
    //   }
    );    
  }
  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, page, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
 
  onProductClick(productId: number) {
    debugger
    this.router.navigate(['/products', productId]);
  }  
}
