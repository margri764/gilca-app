import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  closeIsLoading$ : EventEmitter<boolean> = new EventEmitter<boolean>; 
  labelInvalidCredential$ : EventEmitter<boolean> = new EventEmitter<boolean>; 

  constructor(
                  private dialog : MatDialog,
                  private http : HttpClient,
                  private router : Router
  ) { }

  getError(error : any) {

  

    if (error.status === 401 && error.error.message === "Token expired") {
      // localStorage.removeItem('logged');
      // this.cookieService.delete('token');
      // setTimeout(()=>{
      //   this.openDialogLogin();
      // },500)
      
      
      // this.close$.next(true);
      // this.close$.next(false);
      // this.closeIsLoading$.emit(true);
      return of(null);
    }

    if (error.status === 401 && error.error.message === "Invalid Token") {
        // this.logoutInvalidToken();
        // this.openDialogLogin();
        // this.close$.next(true);
        // this.close$.next(false);
        // this.closeIsLoading$.emit(true);
      return of(null);


    }


    if (error.status === 401) {
      this.logout();
      this.openDialogLogin();

      return of(null);
    }


    if (error.status === 500 && error.error.message === "Pedido no encontrado"){
      this.closeIsLoading$.emit(true);
      this.openGenericMsgAlert(error.error.message);
      return of(null);
    }

    if (error.status === 500 && error.error.message === "El pedido no puede ser editado, se encuentra emitido o cancelado.") {
      // alert("El pedido no puede ser editado, se encuentra emitido o cancelado.");
      this.openGenericMsgAlert(error.error.message);
      this.closeIsLoading$.emit(true);
      return of(null);
    }

    
    // if (error.status === 500 && error.error.message.includes("El CUIT 20277527473 ya existe en la agenda") ) {
    //   this.labelInvalidCode$.emit(true);
    //   this.closeIsLoading$.emit(true);
    //   alert("cuit")
    //   return of(null);
    // }
    
    if (error.status === 500) {
      this.openDialogBackendDown();
      this.closeIsLoading$.emit(true);
      return of(null);
    }

     if (error.status === 403 && error.error.message==="Credenciales invalidas." ) {
      // this.closeIsLoading$.emit(true);
      // this.labelInvalidCredential$.emit(true);
      return of(null);
    }

    if (error.status === 404 ) {
      this.closeIsLoading$.emit(true);
      // ojo esto va en duro en el componente para redirigir al login!!
      this.openGenericMsgAlert('Parece en error involuntario. Contacte al administrador')
      return of(null);
    }

    if (error.status === 304 ) {
      this.closeIsLoading$.emit(true);
      alert("El prestamo ya se encuentra pagado")
      // ojo esto va en duro en el componente para redirigir al login!!
      // this.openGenericMsgAlert('Parece en error involuntario. Contacte al administrador')
      return of(null);
    }

    if (error.status === 400 ) {
      this.closeIsLoading$.emit(true);
      alert(error.error.message)
      // ojo esto va en duro en el componente para redirigir al login!!
      // this.openGenericMsgAlert('Parece en error involuntario. Contacte al administrador')
      return of(null);
    }

    if (error.statusText === "Unknown Error" ) {
      this.closeIsLoading$.emit(true);
      this.openGenericMsgAlert('Parece en error involuntario. Contacte al administrador')
      return of(null);
    }

    // Devuelve un observable que emite el error original
    return throwError(() => error);

  }

  logout(){
    // return this.http.get<any>(`${this.baseUrl}api/logout`) 
    // .pipe(
    //   tap( (res)=>{
    //              console.log('desde logout');
    //              sessionStorage.removeItem("token");
    //              this.close$.next(true);
    //              this.close$.next(false);
    //              localStorage.removeItem("logged");
    //              localStorage.removeItem("user");
    //              sessionStorage.removeItem("token");
    //              sessionStorage.removeItem("openOrders");
    //              this.cookieService.delete('token');
    //              this.store.dispatch(articleActions.unSetArticles());
    //              this.store.dispatch(articleActions.unSetSelectedArticles());
    //              this.store.dispatch(articleActions.unSetTempOrder());
    //              this.store.dispatch(authActions.unSetTempClient());
    //              this.store.dispatch(authActions.unSetUser());
    //              this.store.dispatch(authActions.unSetSalePoint());
    //             //  setTimeout(()=>{location.reload()},100)
    //              this.router.navigateByUrl('login'); 
            
                 
    //            }
    //   ),
    //   map( res => res )
    // )
  }

  openGenericMsgAlert(msg : string){

    let width : string = '';
    let height : string = '';

    if(screen.width >= 800) {
      width = "350px"
      height ="400px";
    }

    // this.dialog.open(WrongActionMessageComponent, {
    //   data: msg,
    //   width: `${width}`|| "",
    //   height:`${height}`|| "",
    //   // disableClose: true,
    //   panelClass:"custom-modalbox-NoMoreComponent", 
    // });
  
  }

  openDialogBackendDown(){
    // this.dialog.open(ErrorBackendDownComponent,{
    //   width: `${this.width}`|| "",
    //   height:`${this.height}`|| "",
    //   panelClass:"custom-modalbox-message",
    // });
  }

  openDialogLogin() {
    // this.dialog.open(LoginMessageComponent,{
    //   width: `${this.width}`|| "",
    //   height:`${this.height}`|| "",
    //   panelClass:"custom-modalbox-message",
    // });
  }

}
