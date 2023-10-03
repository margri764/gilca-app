import { Injectable } from '@angular/core';
import { getDataLS, getDataSS, saveDataLS, saveDataSS } from 'src/app/Storage';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

 
  constructor(
    ) 
{
}

loadInitialState() {
const user = getDataLS("user");


if(user !== undefined && user !== null){

}


}

saveStateToLocalStorage(dataToSave: any, keyLStorage : string) {
saveDataLS(keyLStorage, dataToSave);
}

saveStateToSessionStorage(dataToSave: any, keyLStorage : string) {
saveDataSS(keyLStorage, dataToSave);
}


}