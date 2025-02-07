import { Component , Input, OnInit} from '@angular/core';
import { Product } from '../../models/product';
import { ProductImage } from '../../models/productImage';
import { ProductService } from '../../services/product.service';
import { enviroment } from '../../enviroments/enviroment';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
  // standalone: true,
  // imports: [
  //   FooterComponent,
  //   HeaderComponent,
  //   CommonModule,
  //   FormsModule,
  // ]
})

export class DetailProductComponent implements OnInit {
  // @Input() images: carouselImage[] = [];
  // @Input() indicators = true;
  // @Input() controls = true;

  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  isPressedAddToCart:boolean = false;
  images: string[] = [];
  constructor(private productService: ProductService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ){

  }

  ngOnInit(){
    debugger
    const idParam: number = this.activatedRoute.snapshot.params['id'];
    if(idParam !== null){
      this.productId += idParam;
    }
    if(!isNaN(this.productId)){
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) =>{
          if(response.product_images && response.product_images.length > 0){
            response.product_images.forEach((product_images :ProductImage) =>{
              this.images.push(product_images.imageUrl = `${enviroment.apiBaseUrl}/products/images/${product_images.imageUrl}`);
            });
          }

          debugger
          this.product = response;
          this.showImage(this.currentImageIndex);
        },
        complete: ()=>{
          debugger;
        },

        error: (error : any) =>{
          debugger;
          console.error(error);
        }
      });
    }else{
      console.error('Invalid Param: '+ idParam )
    }
  }

  selectedImage(index: number): void{
    this.currentImageIndex = index;
  }

  showImage(index: number): void{
    debugger
    if(this.product && this.product.product_images && this.product.product_images.length>0){
      if(index < 0){
        index = 0;
      }else if(index >= this.product.product_images.length){
        index = this.product.product_images.length - 1;
      }

      this.currentImageIndex = index;
    }
  }

  thumbNailClick(index: number){
    this.currentImageIndex = index;
  }

  nextImage(): void{
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void{
    this.showImage(this.currentImageIndex - 1);
  }

  increaseQuantity(): void {
    debugger
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    debugger
    this.isPressedAddToCart = true;
    if (this.product) {
      this.cartService.addToCart(this.productId, this.quantity);
    } else {
      // Xử lý khi product là null
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }  

  getTotalPrice(): number {
    if (this.product) {
      return this.product.price * this.quantity;
    }
    return 0;
  }
  buyNow(): void {      
    if(this.isPressedAddToCart == false) {
      this.addToCart();
    }
    this.router.navigate(['/orders']);
  }

}
