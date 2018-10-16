import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    confirmpassword: string,
    address: string,
    pincode: string
  } = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      confirmpassword: '',
      address: '',
      pincode: ''
    };
  regForm: FormGroup;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    public translateService: TranslateService) {
    this.createForm();
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }
  createForm() {
    this.regForm = this.fb.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: [''],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      phone: ['',  Validators.compose([Validators.required, Validators.maxLength(10)])],
      confirmpassword: ['',  Validators.compose([Validators.required])],
      address: [''],
      pincode: ['', Validators.compose([Validators.maxLength(10)])]
    })
  }
  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.regForm.value).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  changeNumber() {
    if (this.account.phone.length > 10) {
      this.account.phone = this.account.phone.slice(0, 10)
    };
  }
  changePinCode() {
    if (this.account.pincode.length > 6) {
      this.account.pincode = this.account.pincode.slice(0, 6)
    };
  }
}
