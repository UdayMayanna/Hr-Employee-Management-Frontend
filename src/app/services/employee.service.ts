import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employee } from '../models/employee';
import { dashboardStats } from '../models/dashboard-stats';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/employee";

  constructor(private http : HttpClient) { }

  onAddEmployee(employee:any,dept_id:number){
    return this.http.post(this.baseUrl+"/"+dept_id+"/",employee);
  }

  getAllEmployees(hr_id:number){
    return this.http.get<employee[]>("http://localhost:8080/employee/"+hr_id+"/");
  }

  getDashboardCount(hr_id:number){
    return this.http.get<dashboardStats>("http://localhost:8080/employee/dashboard/"+hr_id+"/");
  }

  deleteEmployee(emp_id:number){
    return this.http.delete("http://localhost:8080/employee/"+emp_id+"/");
  }

  updateEmployee(emp_id:number,dept_id:number,employee:employee){
    return this.http.put("http://localhost:8080/employee/"+emp_id+"/"+dept_id+"/",employee);
  }
  
  getSingleEmployee(emp_id:number){
    return this.http.get<employee>("http://localhost:8080/employee/single/"+emp_id+"/");
  }

  getEmployeesBySearch(search:string,hrId:number){
    return this.http.get<employee[]>("http://localhost:8080/employee/search/"+search+"/"+hrId);
  }
}
