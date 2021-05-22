import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShopService} from './shop.service';
import {IProduct} from '../shared/models/product';
import {IBrand} from '../shared/models/brand';
import {IType} from '../shared/models/productType';
import {ShopParams} from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  public brands: IBrand[];
  public types: IType[];
  shopParams = new ShopParams();
  public sortOptions: { name: string; value: string }[] = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];
  public totalCount: number;

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe((response) => {
      this.products = response.data;
      this.shopParams.pageSize = response.pageSize;
      this.shopParams.pageNumber = response.pageIndex;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe((response) => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandIdSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeIdSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(pageNumber: number): void {
    if (pageNumber !== this.shopParams.pageNumber) {
      this.shopParams.pageNumber = pageNumber;
      this.getProducts();
    }
  }

  onSearch(): void {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
