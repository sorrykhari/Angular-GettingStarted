import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './products';
import { ProductService } from './product.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
                this.loadProducts();
              }
  
  pageTitle = 'Product Detail';
  products: IProduct[] = [];
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage = '';
  dataSubject = new BehaviorSubject(null);
  ids: number[] = [];

  ngOnInit(): void {
    //this.loadProducts();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
}

loadProducts(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.sub = this.productService.getProducts().subscribe({
    next: products => {
      this.products =  products;
      this.products.forEach(product => {
        if (product.productId == id) {
          this.product = product;
        }
      }
    );
    },
    error: err => this.errorMessage = err
  });

  this.pageTitle += ` #${id}`;
}

  onBack(): void {
    this.router.navigate(['/products']);
  }

  onNext(): void {
    //this.loadProducts();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.products.forEach(product => {
        this.ids.push(product.productId);
    } );
    console.log(this.ids);
    const productIndex = this.ids.indexOf(id);
    console.log(productIndex);
    this.router.navigate([`/products/${this.ids[productIndex + 1]}`]);
  }
}
