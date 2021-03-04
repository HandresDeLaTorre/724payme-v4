import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private route: Router
  ) { }

  ngOnInit() {
  }

  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  }
  sign_up() {
    this.route.navigate(['./sign-up']);
  }


}
