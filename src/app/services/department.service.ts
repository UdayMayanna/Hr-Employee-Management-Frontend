import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  getAllDepartments(hrId:number){
    return this.http.get("http://localhost:8080/department/"+hrId+"/");
  }

  addDepartment(department:any,hrId:number){
    return this.http.post("http://localhost:8080/department/"+hrId+"/",department)
  }

  getDepartmentCount(hrId:number){
    return this.http.get("http://localhost:8080/department/count/"+hrId+"/");
  }

  deleteDepartment(dept_id:number){
    return this.http.delete<string>("http://localhost:8080/department/"+dept_id+"/");
  }
}
