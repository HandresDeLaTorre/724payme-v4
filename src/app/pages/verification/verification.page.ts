import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

public usuarioDatos:{};

  constructor(
    public authService:AuthService,
    private navCtrl: NavController
    ) {

    }

  ngOnInit() {
    const usuarioDatos = this.authService.userData
    console.log(`el console log es ${usuarioDatos}`);

  }
  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  }
}
