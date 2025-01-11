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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != 1) {
      this.products.forEach(product => {
        this.ids.push(product.productId);
    });
    const productIndex = this.ids.indexOf(id);

      if (productIndex >= 0 && productIndex < this.ids.length) {
        const nextProductId = this.ids[productIndex - 1];
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/products', nextProductId]);
        });
      }
      else {
        console.error('Next product not found.');
      }
    }
    else {
      this.router.navigate(['/products']);
    }
    
  }

  onNext(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ids = [];
    this.products.forEach(product => {
        this.ids.push(product.productId);
    });
    const productIndex = this.ids.indexOf(id);

    if (productIndex >= 0 && productIndex < this.ids.length) {
      const nextProductId = this.ids[productIndex + 1];
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/products', nextProductId]);
      });
    }
    else {
      console.error('Next product not found.');
    }
  }
}
