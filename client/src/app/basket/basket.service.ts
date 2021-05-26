import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Basket, IBasket, IBasketItem} from '../shared/models/basket';
import {map} from 'rxjs/operators';
import {IProduct} from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getBasket(id: string): Observable<void> {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          console.log(this.getCurrentBasketValue());
        })
      );
  }

  setBasket(basket: IBasket): Subscription {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue(): IBasket {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1): void {
    console.log(item);
    console.log(quantity);
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
    console.log(basket);
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      brand: item.productBrand,
      pictureUrl: item.pictureUrl,
      price: item.price,
      productName: item.name,
      quantity,
      type: item.productType,
    };
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
}