import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hr } from '../models/Hr';

@Injectable({
  providedIn: 'root'
})
export class HrServiceService {

  private baseUrl = "https://hr-employee-management-backend.onrender.com";
  constructor(private http:HttpClient){}

  registerHR(Data:Hr){ 
    return this.http.post(this.baseUrl+"/hr/",Data);
  }

   loginHr(email : string,password : string){
    return this.http.get<Hr>(this.baseUrl+"/hr/"+email+"/"+password);
   }

   updateHr(Data:Hr,id:number){
    return this.http.put(this.baseUrl+"/hr/"+id,Data);
   }
}
