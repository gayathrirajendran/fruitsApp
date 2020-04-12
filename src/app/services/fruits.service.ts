import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FruitsService {

  private authData;

  private loginData;

  private fruitsData: any[];

  public currentUser: any;

  private stackData: any[] = [];

  constructor() {

    this.authData = {
      user1: {
        name: 'Admin',
        password: 'Admin',
        permission: 'All'
      },
      user2: {
        name: 'MyName',
        password: 'test',
        permission: 'none'
      }
    };

    this.initData();

  }

  public initData(): void {
    this.fruitsData = [{
      id: 'apple',
      name: 'Apples',
      totalCount: 10,
      isAddVisible: true,
      isSubtractVisible: true
    }, {
      id: 'orange',
      name: 'Orange',
      totalCount: 10,
      isAddVisible: true,
      isSubtractVisible: true
    }, {
      id: 'grape',
      name: 'Grapes',
      totalCount: 10,
      isAddVisible: true,
      isSubtractVisible: true
    }];
  }

  public authenticate(userName: string, password: string): Observable<boolean> {

    this.loginData = Object.keys(this.authData).map((authDataItemIndex: any) => {
      const datum: any = this.authData[authDataItemIndex];
      return datum;
    });

    console.log(this.loginData);

    const response: any[] = this.loginData.filter((item) => item.name === userName && item.password === password);

    this.currentUser = response.length ? response[0] : undefined;

    if (response && response.length) {

      return of(true);

    } else {

      return of(false);

    }

  }

  public getFruits(): Observable<any> {

    return of(this.fruitsData);

  }

  public resetState(): void {

    this.initData();

    this.stackData = [];

  }

  public setStackData(stackData): void {

    this.stackData = stackData;

  }

  public getStackData(): any {

    return this.stackData;

  }



}
