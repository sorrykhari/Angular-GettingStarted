import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './products';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {}
  
  pageTitle = 'Product Detail';
  products: IProduct[] = [];
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage = '';

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products =  products;
        this.products.forEach(product => {
          if (product.productId == id) {
            this.product = product;
          }
        });
      },
      error: err => this.errorMessage = err
    });

    this.pageTitle += ` #${id}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
}

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
