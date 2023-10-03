import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from '../error/error.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { getDataLS } from 'src/app/Storage';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  private baseUrl = environment.baseUrl;
  user : boolean = false;
  token : any;
  
    constructor(
                private authService : AuthService,
                private errorService : ErrorService
              )
  { }
  
  
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
  
  let token;
  
  
  if(req.url.includes("api/login")){
    console.log('se trata del login');
    return next.handle( req )
    .pipe(
      catchError((error : HttpErrorResponse ) => this.errorHandle(error) )
    );
  
  }
  
    if(this.authService.getToken()) {
     token = this.authService.getToken();
   }else{
     token = getDataLS('token')
   }
  
    // console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    const authRequest = !token ? req : req.clone({headers});
  
    return next.handle( authRequest )
    .pipe(
      catchError((error : HttpErrorResponse ) => this.errorHandle(error) )
    );
  }
    
  errorHandle( error: HttpErrorResponse ) {
  
    console.log(error);
  
    const errorMessage = this.errorService.getError(error);
  
    if (error.status === 200 && error.error && error.error.text === "Sesion finalizada") {
      // Realiza el cierre de sesión
       this.errorService.logout();
      // Puedes redirigir aquí si es necesario
    }
  
    return throwError( () => errorMessage)
    // return throwError( () => error)
  }
  
  }
  
  