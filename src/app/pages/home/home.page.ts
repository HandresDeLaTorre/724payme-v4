import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  statement() {
    //this.route.navigate(['./statement']);
  }
 account() {
    this.route.navigate(['./account']);
  }
 fund_transfer_options() {
    //this.route.navigate(['./fund-transfer-options']);
  }
 loan() {
    this.route.navigate(['./loan']);
  }
 list_of_deposites() {
    //this.route.navigate(['./list-of-deposites']);
  }
 loan_info() {
    //this.route.navigate(['./loan-info']);
  }

}
