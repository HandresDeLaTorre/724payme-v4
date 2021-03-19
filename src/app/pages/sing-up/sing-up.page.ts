import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  registroUsuario:FormGroup
  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService:AuthService,
  ) {
    this.formRegUser()
  }

  private formRegUser(){
    this.registroUsuario = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required]],
      displayName: ("")
    })
  }

  ngOnInit() {

  }

  register(event: Event){
    event.preventDefault();
    if (this.registroUsuario.valid) {
      const valor = this.registroUsuario.value;
      this.authService.createUser(valor.email, valor.password)
      .then(() => this.authService.logout())
      .then(()=> this.route.navigate(['verification']))
    };
  }


  verification() {
    this.route.navigate(['./verification']);
  }

}
