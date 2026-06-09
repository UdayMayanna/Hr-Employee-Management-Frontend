import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HrServiceService } from '../../services/hr-service.service';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  employeeRegisterForm: FormGroup = new FormGroup({
    fname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(10),
    Validators.minLength(10), Validators.pattern('^[0-9]{10}$')]),
    gender: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
    joiningDate: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required])
  })

  constructor(private empService: EmployeeService, private depSer: DepartmentService,private router:Router) { }

  loggedHr: any;
  departments: any[] = [];
  ngOnInit() {
    const data = localStorage.getItem("loggedInHr");
    if (data) {
      this.loggedHr = JSON.parse(data);
    }
    this.depSer.getAllDepartments(this.loggedHr.hrId).subscribe((result: any) => {
      this.departments = result;
    })
  }

  onAddEmployee() {

  const deptId = Number(this.employeeRegisterForm.value.department);

  const employeeData = {
    ...this.employeeRegisterForm.value
  };

  delete employeeData.department;

  this.empService
      .onAddEmployee(employeeData, deptId)
      .subscribe({
        next: (result) => {

          alert("Employee added successfully.");

          this.employeeRegisterForm.reset();

          this.router.navigate(['/dashboard/employee']);

        },

        error: (err) => {

          console.log(err);

          alert("Failed to add employee.");

        }
      });

}

}
