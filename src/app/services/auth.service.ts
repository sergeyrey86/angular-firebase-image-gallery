import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  logged(): void {
    this.afAuth.authState.subscribe((user: User | null) => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.user = null;
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.logged();
      await this.router.navigate(['gallery']);
    } catch (e) {
      console.log(e);
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.logged();
      await this.router.navigate(['gallery']);
    } catch (e) {
      console.log(e);
    }

  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.user = null;
      await this.router.navigate(['login']);
    } catch (e) {
      console.log(e);
    }

  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}
