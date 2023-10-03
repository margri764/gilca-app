import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { saveDataLS } from 'src/app/Storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  token : string = '';
  user! : any;

  constructor(
              private http : HttpClient,
  ) { }


  login(email: string, password : string){
      const body = { email, password }
    
      return this.http.post<any>(`${this.baseUrl}api/auth/login`, body) 
      
      .pipe(
        tap( ( {token, user} ) =>{
                        if(token){
                            this.token = token.token;
                            this.user = user;
                            saveDataLS('token', token.token)
                        }           
                      console.log("desde login Service: ",token);
                  }  
        ),            
        map( res => {console.log("desde login Service: ",res); return res} )
      )
    }

  getToken(){
    return this.token
  }

  getUserLoanById( id:string ){

    return this.http.get<any>(`${this.baseUrl}api/loan/${id}`) 
      
    .pipe(
      map( res => {console.log("desde getUserLoanById Service: ",res); return res} )
    )
  }

  getAllLoans( ){

    return this.http.get<any>(`${this.baseUrl}api/loan`) 
      
    .pipe(
      map( res => {console.log("desde getAllLoans Service: ",res); return res} )
    )
  }

  getPayments(  ){

    return this.http.get<any>(`${this.baseUrl}api/loan/payment`) 
      
    .pipe(
      map( res => {console.log("desde getPayments Service: ",res); return res} )
    )
  }


  searchUser( query:string ){
    return this.http.get<any>(`${this.baseUrl}api/search?userSearch=${query}`) 
      
    .pipe(
      tap( (  ) =>{
                      
                }  
      ),            
      map( res => {console.log("desde searchUser Service: ",res); return res} )
    )
  }

  registerPayment( body:any, amount:number){

    const { _id } = body;
    return this.http.put<any>(`${this.baseUrl}api/loan/${_id}?amount=${amount}`, body) 
      
    .pipe(
      map( res => {console.log("desde registerPayment Service: ",res); return res} )
    )
  }
    
}
