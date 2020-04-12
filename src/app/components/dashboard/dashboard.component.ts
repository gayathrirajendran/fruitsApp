import { Component, OnInit } from '@angular/core';
import { FruitsService } from 'src/app/services/fruits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data: any[];

  public stackData: any[] = [];

  public isError = false;

  public isAuthenticated = false;

  public isActAllowed = false;

  constructor(private fruitService: FruitsService, private router: Router) { }

  ngOnInit() {

    this.isAuthenticated = !!this.fruitService.currentUser;

    console.log(this.fruitService.currentUser);

    this.isActAllowed = this.fruitService.currentUser && this.fruitService.currentUser.name === 'Admin';

    if (!this.isAuthenticated) {
      this.router.navigate(['/login']).then(() => this.fruitService.resetState());
    }

    this.stackData = this.fruitService.getStackData();

    this.fruitService.getFruits().subscribe((response: any[]) => {

      this.data = response;

    }, () => {

      console.log('error');
    });

  }

  addToCart(id: string) {

    console.log(id);

    this.data.map((item: any) => {
      if (item.id === id && item.totalCount > 0) {
        this.isError = false;
        item.totalCount = item.totalCount - 1; this.stackData.push(id); this.fruitService.setStackData(this.stackData);
      }
    });

  }

  removeFromCart(id: string) {

    if (id === this.stackData[this.stackData.length - 1]) {

      this.isError = false;

      this.data.map((item: any) => {
        if (item.id === id && item.totalCount < 11) {
          item.totalCount = item.totalCount + 1; this.stackData.pop(); this.fruitService.setStackData(this.stackData);
        }
      });

    } else {

      this.isError = true;
    }

  }

}
