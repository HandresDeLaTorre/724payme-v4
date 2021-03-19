import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  app_title:string = '724 PAYME'

  loginUsuario:FormGroup;

  userData:any;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private navCtrl: NavController,
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.formLogin()
  }

  private formLogin(){
    this.loginUsuario = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {

  }

  tabs(event: Event) {
    event.preventDefault();
    //console.error('Funciona el boton')
    //this.route.navigate(['./tabs']);
    if (this.loginUsuario.valid){
      const valor = this.loginUsuario.value
     // console.log(`el usuario es ${valor.email}`);
      this.authService.SignIn(valor.email, valor.password)
      //.then(()=>this.route.navigate(['tabs']))
    }else {
      window.alert('Los datos no son validos')
    }
  }



  sign_up() {
    this.route.navigate(['./sing-up']);
  }


}
