import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
// import { UserDialogComponent } from '../user-dialog/user-dialog.component';
// import { ConfirmedValidator } from '../confirm-password';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConfirmedValidator } from '../confirm-password';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /* null insertions: https://stackoverflow.com/questions/54104187/typescript-complain-has-no-initializer-and-is-not-definitely-assigned-in-the-co */
  signUpForm!: FormGroup
  constructor(
    private fb: FormBuilder, 
    private auth: AngularFireAuth, 
    private router: Router, 
    private userService: UsersService,
    private dialog: MatDialog,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      //custom validator imported from confirm-password.ts
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  get fname() {return this.signUpForm.get('fname')}
  get lname() {return this.signUpForm.get('lname')}
  get email() {return this.signUpForm.get('pawprint')}
  get password() {return this.signUpForm.get('password')}
  get confirmPassword() {return this.signUpForm.get('confirmPassword')}
  get f(){return this.signUpForm.controls;}

  //Will create the user by getting the pawprint, concat. w/ @umsystem, and sending user back to home page
  userRole: any;
  createUser() {
    if(this.signUpForm.valid){
      const {email, password} = this.signUpForm.value;
      this.auth.createUserWithEmailAndPassword(email, password).then (userResponse => {
      
        let user = {
          id: userResponse.user!.uid,
          email: userResponse.user!.email,
          fname: this.fname!.value,
          role: 'user',
        }

        console.log(user);
        this.userService.setUser(user)
        this.userService.getUser(user.fname).subscribe(user => {
          //do profile things here if we get to it
          // console.log(user);
        })
        this.auth.signOut();
        this.router.navigate([''])
      })
  
      // this will get the data from the signUpForm and pass it to the userService's 'createUser' method
    //   let data = this.signUpForm.value;
    //   // console.log(data);
    //   this.userService.createUser(data)
    //     this.dialog.open(UserDialogComponent, {
    //       data: {
    //         formData: this.signUpForm.value,
    //         thanks: "Thank you!"
    //       }
    //     })
    }
  }
  //Dialog reference: https://www.techiediaries.com/angular-material-dialogs/

}
