import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getDataLS, saveDataLS } from 'src/app/Storage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ErrorService } from 'src/app/shared/services/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;
  lstorageSelected: string = "true";
  user : any ;
  passwordError: string = '';
  passwordVisible = false;
  isLoading : boolean = false;
  confirm : boolean = false;
  showLabelInvalidCredential : boolean = false;


    constructor( 
                 private fb: FormBuilder,
                 private authservice : AuthService,
                 private router: Router,
                 private errorService : ErrorService,
                 private dialog : MatDialog,
                )
  {
    const token = getDataLS('token')
    const logged = getDataLS('logged')

    if ( (token !== '') && logged) {
      this.router.navigateByUrl('/home')
    }
        


  }

ngOnInit() {

  this.errorService.labelInvalidCredential$.subscribe((emmited)=>{if(emmited){this.showLabelInvalidCredential = true; this.isLoading = false}});
  this.errorService.closeIsLoading$.emit(true); //esto lo tengo para cerrar el isLoading del app q lo tengo para los hard reload
  this.errorService.closeIsLoading$.subscribe((emmited)=>{if(emmited){this.isLoading = false }});
  
  this.myForm = this.fb.group({
    email:     [ 'test@gilca.com', [Validators.required] ],
    password:  [ 'Aa234567', [Validators.required]],
    toLStorage: [ true ], 
  });
  
}

 onSaveForm(){

        if ( this.myForm.invalid ) {
          this.myForm.markAllAsTouched();
          return;
        }
        this.showLabelInvalidCredential = false;
        this.isLoading = true;
        this.confirm = true;
        const email = this.myForm.get('email')?.value;
        const password = this.myForm.get('password')?.value;
        this.authservice.login(email, password).subscribe(
          ({token, user})=>{
              if(token){
                      saveDataLS('user', user);
                      this.isLoading = false;
                      
                      if(this.myForm.get('toLStorage')?.value === true){
                        saveDataLS('logged', true);
                      }

                      this.router.navigateByUrl('/home')
                      
                     }
                }
         );   

 }  


validField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}


togglePasswordVisibility(value : string) : void {
  (value == "password") ? this.passwordVisible = !this.passwordVisible : '';
}


  
}