import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterLink } from "@angular/router";
import { employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [RouterLink,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  
  employees : employee[] =[];

  deleteMsg : string = "";

  serachInput : string = ""
  constructor(private empSer : EmployeeService,private router : Router){}

  ngOnInit(){
    const data = JSON.parse(localStorage.getItem('loggedInHr')!);
    if(data){
      this.empSer.getAllEmployees(data.hrId).subscribe((result:employee[])=>{
        if(result){
          this.employees = result;
        }
      })
    }
  }

  onDelete(emp_id:number){
     this.empSer.deleteEmployee(emp_id).subscribe((result:any)=>{
        alert("Employee removed successfully.")
        this.ngOnInit();
     })
  }

  onUpdate(emp_id:number){
    this.router.navigate(['/dashboard/update-employee',emp_id])
  }

  employeeResults(){
    if(this.serachInput === ''){
      this.ngOnInit();
    }
    this.empSer.getEmployeesBySearch(this.serachInput).subscribe((result:employee[])=>{
      if(result){
        this.employees = result;
      }
    })
  }
}
