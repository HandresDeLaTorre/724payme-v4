import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { merge } from 'rxjs';
import { Monedero } from '../interfaces/monedero';

@Injectable({
  providedIn: 'root'
})
export class MonederocreateService {

  monederoData:any;

  usuarioActual:any

  constructor(
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
       // aqui comienza el almacenamiento en local Storage
       this.afAuth.authState.subscribe(user => {
        if (user) {
          this.usuarioActual = user;
          localStorage.setItem('user', JSON.stringify(this.usuarioActual));
          JSON.parse(localStorage.getItem('user'));
          console.log(`Este es un log; El usuario guardado en localstorage es:  ${JSON.stringify(user.uid)}`);

        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
      // aqui Termina el almacenamiento en local Storage

   }

   usuario1(){
     return  this.usuarioActual = this.afAuth.currentUser
     .then(() => console.log(`Este es el log desde monedero service ${this.usuarioActual}`)
     )
   }

/*    updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`monederos-new/${user.uid}`);
    const monederoData: Monedero = {
      uid: user.uid,
      //email: user.email,
      Nombre: user.displayName,
      tel: user.photoURL,
      //emailVerified: user.emailVerified
    }
    return userRef.set(monederoData, {
      merge: true
    })
  } */

  upDateUser( datosUsuario:any){
    return this.afAuth.authState.subscribe( usuario => {
      if(usuario){
        let userUid = usuario.uid
        //let monederoID = userUid+
        const monederoData: Monedero = {
          uid: usuario.uid,
          //email: datosUsuario.email,
          displayName: datosUsuario.displayName,
          tel: datosUsuario.tel,
          //emailVerified: user.emailVerified
        }
        return this.afs.collection('usuarios-monederos').doc(userUid).set(monederoData, {merge: true})
      }
    })


  }

}
