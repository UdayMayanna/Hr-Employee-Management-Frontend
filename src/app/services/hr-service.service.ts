import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hr } from '../models/Hr';

@Injectable({
  providedIn: 'root'
})
export class HrServiceService {

  constructor(private http:HttpClient){}

  registerHR(Data:Hr){ 
    return this.http.post("http://localhost:8080/hr",Data);
  }

   loginHr(email : string,password : string){
    return this.http.get<Hr>("http://localhost:8080/hr/"+email+"/"+password);
   }

   updateHr(Data:Hr,id:number){
    return this.http.put("http://localhost:8080/hr/"+id,Data);
   }
}
