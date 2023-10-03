import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { ErrorService } from './shared/services/error/error.service';
import { LocalstorageService } from './shared/services/localstorage/localstorage.service';
import { getDataLS } from './Storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gilca-app';

  
  isLoading : boolean = false;
  user : any;
  phone : boolean = false;


 constructor(
             private localStorageService: LocalstorageService,
             public router : Router,
             private authService : AuthService,
             private errorService : ErrorService

 ){
   

   const token = getDataLS('token');
   const userLS = getDataLS('user');
   
   if(token !== '' && userLS === undefined){
    //  this.authService.getUser().subscribe();
   }
   if(token !== '' && userLS !== undefined ){
     console.log(userLS);
  
   }

   (screen.width <= 800) ? this.phone = true : this.phone = false;

 }

 ngOnInit(): void {

  this.localStorageService.loadInitialState();



   
  this.errorService.closeIsLoading$.subscribe((emmited)=>{if(emmited){this.isLoading = false}})
 
  

  //  this.router.events.subscribe(event => {
  //    if (event instanceof NavigationEnd) {
  //      this.currentUrl = event.url;
  
  //    }
  //  });


 }




}


