import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  userEmail: any;



/*   urle = actionCodeSettings = {
   url:'http://localhost:8100/sing-in',
   handleCodeInApp: true,
 }
 */
  constructor(
    private afauth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {

    this.afauth.authState.subscribe(user => {
      if (user) {
        this.userData = user;

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        console.log(user);

      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

     // Sign in with email/password
  SignIn(email, password) {
    return this.afauth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['tabs']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password

  createUser(email: string, password: string) {
    /* return this.afauth.createUserWithEmailAndPassword(email, password); */
    return this.afauth.createUserWithEmailAndPassword(email, password)
    .then((result) =>{
      result.user.sendEmailVerification()
      //this.SendVerificationMail();
      this.SetUserData(result.user);
    }).catch((error) => {
       window.alert(error.message)
      })
    //.then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
    //  this.SendVerificationMail();
    //  this.SetUserData(result.user);
    //}).catch((error) => {
    //  window.alert(error.message)
    //})

  }

/*     SendVerificationMail(){
    const  actionCodeSettings = {
      url:'http://localhost:8100/sing-in',
      handleCodeInApp: true,
    }
    return this.afauth.sendSignInLinkToEmail(this.userEmail, actionCodeSettings )
    .then(() => {
      //this.router.navigate(['verify-email-address']);
      window.alert("Revisa el correo")
    })
  } */

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

      // Sign in with Google
/*   GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  } */

  // Auth logic to run auth providers

  AuthLogin(provider) {
    return this.afauth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['account']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  logout(){
    return this.afauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


}

