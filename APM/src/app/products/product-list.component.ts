import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./products.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin: number = 2;
    showImage = false;
    errorMessage = '';
    sub!: Subscription; //sub! tells Typescript we will handle assignment of variable later
    
    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    } 
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ', value);
        this.filteredProducts = this.performFilter(value);
    }
    
    filteredProducts: IProduct[] = [];
    products: IProduct[] =[];

    constructor(private productService: ProductService) {}
    
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
    
    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
          this.sub = this.productService.getProducts().subscribe({
            next: products => { 
                this.products = products;
                this.filteredProducts = this.products; //only sets list of products when observablre emits data
                },
            error: err => this.errorMessage = err
        });
         
        this._listFilter = 'cart';
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}