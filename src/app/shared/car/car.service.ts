import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/cars';
  public OWNER_API = this.API + '/owners';


  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cars');
  }

  getOwner(): Observable<any> {
    return this.http.get(this.API + '/owners');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  getEditOwner(id: string) {
    return this.http.get(this.OWNER_API + '/' + id);
  }


  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  saveOwner(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNER_API, owner);
    }
    return result;
  }
  

  remove(href: string) {
    return this.http.delete(href);
  }
}
