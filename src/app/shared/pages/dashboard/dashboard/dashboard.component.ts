import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime } from 'rxjs';
import { GenericSuccessComponent } from 'src/app/shared/messages/generic-success/generic-success/generic-success.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators/validators.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})




export class DashboardComponent implements OnInit {

  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  myForm: FormGroup;
  myFormInput!: FormGroup;
  debt : boolean = true;
  payment : boolean = false;
  public positiveNumberPattern: string = '^[1-9][0-9]*$';

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
  loans : any ;

  
displayedColumns: string[] = ['date','client','total',];
dataTableActive : any = new MatTableDataSource<any>();

// end search



  constructor(
                private fb: FormBuilder,
                private authService : AuthService,
                private dialog : MatDialog,
                private validatorService : ValidatorsService
  ) { 

    (screen.width <= 800) ? this.phone = true : this.phone = false;

    this.myForm = this.fb.group({
      itemSearch:  [ '',  ],
    });  

    this.myFormInput = this.fb.group({
      amount: ['', ]
    });

    
  

  }

  ngOnInit(): void {

    this.getAllLoans();
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

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const amount = this.myFormInput.get('amount')?.value;
    if(amount <= 0){
      this.myFormInput.get('amount')?.setValue('');
      return
    }

    this.authService.registerPayment(client, amount).subscribe(
      ({success})=>{
        if(success){
          this.getAllLoans();
          this.myFormInput.get('amount')?.setValue('');
          this.openGenericSuccess('Pago registrado con éxito')
          
        }
      })
    

  }

     validField( field: string ) {
      const control = this.myForm.controls[field];
      return control && control.errors && control.touched;
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
}

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
              this.isClientFounded = true;
              this.clientFounded = loan;
              let amount;
              this.clientFounded.forEach((item)=>{amount = item.amount})
              // this.myFormInput.get('amount')?.setValue(amount)
              console.log(this.clientFounded);
    
    // this.close();
  })
}
  // search

  selectOption( option:string){

    switch (option) {
      case 'payment':
                    this.payment = true;
                    this.debt = false;
                    this.getPayment();
        break;

      case 'debt':
                  this.debt = true;
                  this.payment = false;
       break;
    
      default:
        break;
    }
  }


  getAllLoans(){
    this.isLoading = true;
    this.authService.getAllLoans().subscribe(
      ({loans})=>{
        this.loans = loans;
        this.isLoading = false;
        this.search = true;
      })
  }

  getPayment(){
    this.isLoading = true;
    this.authService.getPayments().subscribe(
      ({loans})=>{
        this.dataTableActive = loans
        this.isLoading = false;
        this.search = true;
      })
  }



  openGenericSuccess(msg : string){

    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "400px"
      height ="450px";
    }

    this.dialog.open(GenericSuccessComponent, {
      data: msg,
      width: `${width}`|| "",
      height:`${height}`|| "",
      disableClose: true,
      panelClass:"custom-modalbox-NoMoreComponent", 
    });
  
  }
}
