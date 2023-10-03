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

    // const loan = [
    //   {
    //       "_id": "651b8ba7b011916617f386c0",
    //       "user": {
    //           "_id": "651b761142f9913f316a6ad8",
    //           "name": "Fernando",
    //           "lastName": "Perez",
    //           "password": "$2a$10$p.lGlArHTr/T8unfGQs2vu3sd1jjlwlOUjADvqv54e8.7po4j.qKC",
    //           "email": "test2@gmail.com",
    //           "clientNumber": "NREV1447",
    //           "activeLoan": true,
    //           "address": "Avenida Mariscal 3424",
    //           "phone": " 22408143",
    //           "state": true,
    //           "createdAt": "2023-10-03T02:01:53.980Z",
    //           "updatedAt": "2023-10-03T02:01:53.980Z",
    //           "__v": 0
    //       },
    //       "closedDate": null,
    //       "amount": 6500,
    //       "description": "cliente preferencial - recurrente",
    //       "status": "pendiente",
    //       "createdAt": "2023-10-03T03:33:59.665Z",
    //       "updatedAt": "2023-10-03T03:33:59.665Z"
    //   }
    // ]

    // return loan
    return this.http.get<any>(`${this.baseUrl}api/loan/${id}`) 
      
    .pipe(
      tap( (  ) =>{
                      
                }  
      ),            
      map( res => {console.log("desde getUserLoanById Service: ",res); return res} )
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
