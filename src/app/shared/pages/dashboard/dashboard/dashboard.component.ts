import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})




export class DashboardComponent implements OnInit {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  myForm!: FormGroup;
  myFormInput!: FormGroup;

  itemSearch : string = '';
  mostrarSugerencias: boolean = false;
  sugested : string= "";
  suggested : any[] = [];
  spinner : boolean = false;
  fade : boolean = false;
  search : boolean = true;
  product  : any[] = [];
  contactos : any []=[];
  isLoading : boolean = false;
  arrClient : any []=[];
  clientFounded : any [] = [];
  isClientFounded : boolean = false;
  labelNoFinded : boolean = false;
  phone : boolean = false;
  noMatches : boolean = false;

// end search



  constructor(
                private fb: FormBuilder,
                private authService : AuthService
  ) { 

    (screen.width <= 800) ? this.phone = true : this.phone = false;

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
    });  

    this.myFormInput = this.fb.group({
      amount:  [ '' ],
    });  

  }

  ngOnInit(): void {
    this.Search(this.fade);
     //para las busquedas
     this.myForm.get('itemSearch')?.valueChanges.subscribe(newValue => {
      this.itemSearch = newValue;

       console.log(this.myForm.get('itemSearch')?.value);
      if(this.itemSearch !== ''){
         this.teclaPresionada();
      }
    });

    this.debouncer
    .pipe(debounceTime(400))
    .subscribe( valor => {

      this.sugerencias(valor);
    });

    

  }

  onSubmit(client : any){

    console.log(client);
    const amount = this.myFormInput.get('amount')?.value;
    console.log(amount);

    this.authService.registerPayment(client, amount).subscribe(
      ({success})=>{
        if(success){
          alert('Pago registrado con éxito')

        }
      })
    

  }


  // search
close(){
  this.mostrarSugerencias = false;
  this.itemSearch = '';
  this.suggested = [];
  this.spinner= false;
  this.isClientFounded = false;
  this.myForm.get('itemSearch')?.setValue('');
  this.noMatches = false;
}


teclaPresionada(){
  this.noMatches = false;
  this.debouncer.next( this.itemSearch );  
};


sugerencias(value : string){
    this.spinner = true;
    this.itemSearch = value;
    this.mostrarSugerencias = true;  
    this.authService.searchUser(value)
    .subscribe ( ({users} )=>{
      if(users.length !== 0){
        // this.arrArticlesSugested = articulos;
        this.suggested = users.splice(0,10);
        console.log(this.suggested);
          this.spinner = false;
        }else{
          this.spinner = false;
          this.noMatches = true;
          this.myForm.get('itemSearch')?.setValue('');
        }
      }
    )
}
  
Search( item: any ){
    this.mostrarSugerencias = true;
    this.spinner = false;
    this.fade = false;
    console.log(item);
    this.authService.getUserLoanById(item._id).subscribe( 
      ({loan})=>{
      // this.clientFounded = this.authService.getUserLoanById(item._id) 
    this.isClientFounded = true;
    this.clientFounded = loan;
    let amount;
     this.clientFounded.forEach((item)=>{amount = item.amount})
    this.myFormInput.get('amount')?.setValue(amount)
    console.log(this.clientFounded);
    
    // this.close();
  })
}
  // search

}
