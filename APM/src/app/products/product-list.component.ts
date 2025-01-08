import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnDestroy {
    
    constructor(private productService: ProductService) {}
  
    pageTitle: string = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    clickMe = false;
    errorMessage = '';
    sub!: Subscription;
    
    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] =
    [];
    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products =  products;
            //console.log(this.products);
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    starClick(starBool: boolean): void {
      this.clickMe = starBool;
    }
}