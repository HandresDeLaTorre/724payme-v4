import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MonederocreateService } from 'src/app/services/monederocreate.service';

@Component({
  selector: 'app-completar-perfil',
  templateUrl: './completar-perfil.page.html',
  styleUrls: ['./completar-perfil.page.scss'],
})
export class CompletarPerfilPage implements OnInit {

  registroUpdate:FormGroup

  userData:any;
  public userUID:any;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private monederocreateService:MonederocreateService
  ) {
    //const userUID = this.authService.userData;
    //console.error(`Este es el mensaje para ubicar el UID: ${userUID}`);

    this.formUpdateUser()
  }

  private formUpdateUser(){
    this.registroUpdate = this.formBuilder.group({
      //email:    ['', [Validators.required, Validators.pattern(this.isEmail)]],
      //password: ['', [Validators.required]],
      //uid: (this.userUID),
      displayName: (""),
      tel:         (1)
    })
  }

  ngOnInit() {
    const localS = localStorage.getItem('user');
    this.userUID =  localS
    console.error(`Este es el UID desde local Storage: ${this.userUID}`)
  }

  updateUser(event: Event){
    event.preventDefault();
    let user = this.registroUpdate.value
   /*  let uidUser = this.userUID
    console.log(`Este log es de la variable User: ${user}`);
    console.error(`esta alert es el Useruid: ${this.userUID}`) */

   this.monederocreateService.upDateUser(user);
   this.route.navigate(['account'])
    //.then(()=> )

    //.catch(()=> window.alert('el Usuario no se actualizo'))
  }


}
